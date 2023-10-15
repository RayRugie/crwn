import { signInWithPopup1, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithPopup1();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign IN Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            </div>
    );
};

export default SignIn 