import { initializeApp } from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

 
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) =>{
  
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
      const docRef = doc(collectionRef, object[field].toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db,'categories');
    const q=query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
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

  };

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);