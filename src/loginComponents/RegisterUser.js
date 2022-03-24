import React from "react";
import { useState } from "react";
import Axios from "axios";
import UserPool from "./UserPool";
import "../StyleSettings.css"


/*  when called, creates a new user record in the database  */
async function createUsername(email, username)
{
    const usernameAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    try
    {
        await usernameAPICall.post(`/username/insert/`, { userDataID: email, userName: username } );
    }catch(err)
    {
        console.log(err);
    }
}

function RegisterUser(props)
{
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let emailInputElement = document.getElementById("emailInputID");
    let usernameInputElement = document.getElementById("usernameInputID");
    let passwordInputElement = document.getElementById("passwordInputID");
    let confirmPasswordElement = document.getElementById("confirmPasswordID");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        //if any of these fields are empty, ask for them to be completed
        if(emailInputElement.value === "" || usernameInputElement.value === "" || passwordInputElement.value === "" || confirmPasswordElement.value === "")
        {
            alert("All fields are required to complete registration.");
        }else if(!email.match(emailFormat))         //if the email input isn't formatted like an email, reject
        {
            emailInputElement.setCustomValidity("Not a valid email format.");
        }else if(password !== confirmPassword)      //if the password and confirm password don't match, reject
        {
            alert("Password and Confirm Password must match exactly.");
        }else
        {
            /*  If the input is all valid, attempts a user registration with Cognito and (separately) creates the username in the database  */
            UserPool.signUp(email, password, [], null, (err, data) =>
            {
                if(err)
                {
                    alert("Registration failed. Please make sure you're using a valid email address. " +
                            "Passwords must contain at least 8 characters, an uppercase letter, a lowercase letter, a special character, and a number.");
                }else
                {
                    createUsername(email, username);
                    alert("Registration succeeded. Please check your email for a confirmation link. After confirming your email, you can log in.");

                    //resets the inputs
                    emailInputElement.value = "";
                    usernameInputElement.value = "";
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
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input id="usernameInputID" value={username} onChange={ (event) => setUsername(event.target.value) } required />
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
