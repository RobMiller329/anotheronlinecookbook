import React from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import "../StyleSettings.css"

function UserLogin(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //refers to this as "destructuring" - what does that mean?
    const { authenticate } = useContext(AccountContext);

    let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let emailInputElement = document.getElementById("emailInput");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(!email.match(emailFormat))
        {
            emailInputElement.setCustomValidity("Not a valid email format.");
        }else
        {
            authenticate(email, password)
                .then((data) =>
                {
                    //console.log("Logged in!", data);
                    alert("Logged in!");
                })
                .catch((err) =>
                {
                    //console.error("Failed to login", err);
                    alert("Failed to login. The email and/or password do not match our records.");
                });
        }
    };

    return(
        <div className="loginContainer">
            <div>
                <p>Already have an account? Login here!</p>
            </div>
            <div className="loginForm">
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="loginEmailInput" value={email} onChange={ (event) => setEmail(event.target.value) } required />
                    <br/><br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" value={password} onChange={ (event) => setPassword(event.target.value) } required />
                    <br/><br/>
                    <button type="submit" className="loginButton">Login</button>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;