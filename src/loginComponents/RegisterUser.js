import React from "react";
import { useState } from "react";
import UserPool from "./UserPool";
import "../StyleSettings.css"

function RegisterUser(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let emailInputElement = document.getElementById("emailInputID");
    let passwordInputElement = document.getElementById("passwordInputID");
    let confirmPasswordElement = document.getElementById("confirmPasswordID");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(!email.match(emailFormat))
        {
            emailInputElement.setCustomValidity("Not a valid email format.");
        }else if(password !== confirmPassword)
        {
            alert("Password and Confirm Password must match exactly.");
        }else
        {
            UserPool.signUp(email, password, [], null, (err, data) =>
            {
                if(err)
                {
                    alert("Registration failed. Please make sure you're using a valid email address. " +
                            "Passwords must contain at least 8 characters, an uppercase letter, a lowercase letter, a special character, and a number.");
                }else
                {
                    alert("Registration succeedded. Please check your email for a confirmation link. After confirming your email, you can log in.");
                    emailInputElement.value = "";
                    passwordInputElement.value = "";
                    confirmPasswordElement.value = "";
                }
            });
        }
    };

    return(
        <div>
            <div>
                <p>Need an account? Register here!</p>
            </div>
            <div className="registerForm">
                <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="emailInputID" value={email} onChange={ (event) => setEmail(event.target.value) } required />
                    <br/><br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" id="passwordInputID" value={password} onChange={ (event) => setPassword(event.target.value) } required />
                    <br/><br/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <br/>
                    <input type="password" id="confirmPasswordID" value={confirmPassword} onChange={ (event) => setConfirmPassword(event.target.value) } required />
                    <br/><br/>
                    <button type="submit" className="loginButton">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;