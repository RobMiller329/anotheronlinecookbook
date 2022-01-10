import React from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import '../StyleLoginRegister.css';

function UserLogin(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //refers to this as "destructuring" - what does that mean?
    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) =>
    {
        event.preventDefault();

        authenticate(email, password)
            .then((data) =>
            {
                console.log("Logged in!", data);
            })
            .catch((err) =>
            {
                console.error("Failed to login", err);
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