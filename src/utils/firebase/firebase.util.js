import  {initializeApp  } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { getFirestore,doc, 
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCWko33SRrJjEzqhuibDTtVsxPs-g61e90",
    authDomain: "crwn-clothing-db-fdcb7.firebaseapp.com",
    projectId: "crwn-clothing-db-fdcb7",
    storageBucket: "crwn-clothing-db-fdcb7.appspot.com",
    messagingSenderId: "786545180965",
    appId: "1:786545180965:web:c33984d57f1669af539acc"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithPopup1 = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); 
 
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date()

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch (error){
        console.log('error creating the user', error.message)
      }
    }
    
    return userDocRef
  }