import React from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import "../StyleSettings.css"

function UserLogin(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //allows use of the authenticate function from Cognito
    const { authenticate } = useContext(AccountContext);

    let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let emailInputElement = document.getElementById("loginEmailInputID");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(!email.match(emailFormat))       //email must be in the proper format or it is rejected
        {
            emailInputElement.setCustomValidity("Not a valid email format.");
        }else
        {
            authenticate(email, password)
                .then((data) =>
                {
                    alert("Logged in!");
                    window.location.reload(false);
                })
                .catch((err) =>
                {
                    alert("Failed to login. The email and/or password do not match our records.");
                });
        }
    };

    function guestLogin()
    {
        setEmail("guest@anotheronlinecookbook.com");
        setPassword("P@ssw0rd!");
        console.log(email);
        console.log(password);
    }

    return(
        <div className="loginContainer">
            <div>
                <p>Already have an account? Login here!</p>
            </div>
            <br/>
            <div className="guestLoginContainer">
                <p>Click here to fill in the Guest credentials.</p>
                <button type="button" onClick={() => guestLogin()}>Guest Login</button>
            </div>
            <br/><br/>
            <div className="loginForm">
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" id="loginEmailInputID" value={email} onChange={ (event) => setEmail(event.target.value) } required />
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
