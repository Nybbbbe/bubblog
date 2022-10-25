import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, User, GoogleAuthProvider, signInWithPopup, connectAuthEmulator } from "firebase/auth";
import { collection, Firestore, getFirestore, connectFirestoreEmulator, CollectionReference, DocumentData } from "firebase/firestore";
import appState from "./store/appstate";

class FirebaseService {
  private app: FirebaseApp;
  private analytics: Analytics;
  private auth: Auth;
  private provider: GoogleAuthProvider;
  private db: Firestore;

  public restaurantsRef: CollectionReference<DocumentData>;

  constructor () {
    const firebaseConfig = {
      apiKey: "AIzaSyAEWaUgCldzq3UemTOvcgcso3k56AgNyL4",
      authDomain: "bubblog.firebaseapp.com",
      projectId: "bubblog",
      storageBucket: "bubblog.appspot.com",
      messagingSenderId: "1082681862460",
      appId: "1:1082681862460:web:d12ca8e34a5baa6a07d639",
      measurementId: "G-CBLK0DVFBF"
    };
    
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);

    if (import.meta.env.DEV) {
      connectAuthEmulator(this.auth, "http://localhost:9099");
      connectFirestoreEmulator(this.db, "localhost", 8082);
    }

    this.provider = new GoogleAuthProvider();
    this.auth.onAuthStateChanged((user: User | null) => this.handleAuthChange(user));

    this.restaurantsRef = collection(this.db, "restaurants");
  }

  private handleAuthChange = (user: User | null) => {
    if (user) {
      console.log(user);
      appState.setLoginState(true);
    } else {
      appState.setLoginState(false);
      console.log("No User");
    }
  }

  public signIn = () => {
    signInWithPopup(this.auth, this.provider);
  }

  public signOut = () => {
    this.auth.signOut();
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;

