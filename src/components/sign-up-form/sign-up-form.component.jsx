import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;
    
const resetFormFields = () =>{
    setFormFields(defaultFormFields);
}

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password != confirmPassword) return;

        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        const userDocRef = await createUserDocumentFromAuth(user);
//confirm pass matches
//authenticate with email password
//create user doc
        resetFormFields();

    }

    const handleChange = (event) =>{
        const { name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
        
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

           
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

          
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;