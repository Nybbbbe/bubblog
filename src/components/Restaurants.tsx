import { addDoc, DocumentData, getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import firebaseService from "../InitFirebase";
import "./Restaurants.scss";

type TRestaurants = {
  id: string;
  name: string;
  description: string;
  rating: number;
}

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<TRestaurants[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(firebaseService.restaurantsRef, (docSnapShot: QuerySnapshot<DocumentData>) => {
      const newRestaurants: TRestaurants[] = [];
      docSnapShot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        try {
          const d = doc.data();
          const tmpRes: TRestaurants = {
            id: doc.id,
            name: d.name,
            description: d.description,
            rating: d.rating
          }
          newRestaurants.push(tmpRes);
        } catch (e) {
          console.log(e);
        }
      });
      setRestaurants(newRestaurants);
    })
    return () => {
      console.log("Unsubscribing")
      unsub && unsub();
    }
  }, []);

  const addRestaurant = () => {
    addDoc(firebaseService.restaurantsRef, {
      name: "test",
      description: "test desc",
      rating: 5
    });
  }

  const getRatingWidth = (rating: number) => {
    console.log(rating)
    console.log(`${100 * (rating / 10)}%`);
    return `${100 * (rating / 10)}%`;
  }

  const getRatingColor = (rating: number) => {
    let bColor = "red"
    if (rating > 3) {
      bColor = "yellow"
    }
    if (rating > 7) {
      bColor = "green"
    }
    return bColor;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Restaurants</h1>
      {restaurants.map(restaurant => {
        return (
          <div key={restaurant.id} className="item-container">
            <h4 className="item-title">{restaurant.name}</h4>
            <p>{restaurant.description}</p>
            <div className="rating-container">
              <div className="rating-line"
                style={{width: `${getRatingWidth(restaurant.rating)}`,
                backgroundColor: `${getRatingColor(restaurant.rating)}`
                }}>
              </div>
            </div>
          </div>
          
        )
      })}
      <button onClick={() => {addRestaurant()}}>Add</button>
    </div>
  )
}

export default Restaurants;