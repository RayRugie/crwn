import  {initializeApp  } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWko33SRrJjEzqhuibDTtVsxPs-g61e90",
    authDomain: "crwn-clothing-db-fdcb7.firebaseapp.com",
    projectId: "crwn-clothing-db-fdcb7",
    storageBucket: "crwn-clothing-db-fdcb7.appspot.com",
    messagingSenderId: "786545180965",
    appId: "1:786545180965:web:c33984d57f1669af539acc"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid); 
 
    const userSnapshot = await getDoc(userDocRef);

    //if user data doesn't exists
    // create / set the document with the data from userAuth in my collection 
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date()
 
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      }catch (error){
        console.log('error creating the user', error.message)
      }
    }
    
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email, password)
  };
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email, password)
  };

export const signOutUser = async () => signOut(auth); 

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);