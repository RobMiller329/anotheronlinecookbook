import React from "react";
import { useState } from "react";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import '../StyleLoginRegister.css';

function UserLogin(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        const user = new CognitoUser(
        {
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails(
        {
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) =>
            {
                console.log("onSuccess: ", data);
            },
            onFailure: (err) =>
            {
                console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) =>
            {
                console.log("newPasswordRequired: ", data);
            }
        });
    };

    return(
        <div className="loginForm">
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={ (event) => setEmail(event.target.value) }
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={ (event) => setPassword(event.target.value) }
                ></input>
                <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
    );
}

export default UserLogin;