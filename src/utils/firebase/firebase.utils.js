import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';


const firebaseConfig = {

    apiKey: "AIzaSyBsTQWSON63I8VN1NkTwQd26bcRzbMvmrc",
  
    authDomain: "crwn-clothing-db-15a04.firebaseapp.com",
  
    projectId: "crwn-clothing-db-15a04",
  
    storageBucket: "crwn-clothing-db-15a04.appspot.com",
  
    messagingSenderId: "487350387982",
  
    appId: "1:487350387982:web:71fb49382078297294435f"
  
  };
  
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);  
    const userSnapshot = await getDoc(userDocRef);  

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
            });
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;

  }