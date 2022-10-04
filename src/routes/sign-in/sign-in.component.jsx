import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { createUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const SignIn = () =>{



    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return(
        <div>
            <h1>SIGN IN</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;