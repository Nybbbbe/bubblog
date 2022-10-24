import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

let firebaseService: FirebaseService;

class FirebaseService {
  private app: FirebaseApp;
  private analytics: Analytics;

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
  }
}



export const initFirebase = () => {
  if (!firebaseService) {
    firebaseService = new FirebaseService();
  }
  return firebaseService;
}