import React from "react";
import { useState } from "react";
import UserPool from "./UserPool";
import '../StyleLoginRegister.css';

function RegisterUser(props)
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) =>
        {
            if(err)
            {
                console.log(err);
            }else
            {
                console.log(data)
            }
        });
    };

    return(
        <div className="registerForm">
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
                <button type="submit" className="registerButton">Register</button>
            </form>
        </div>
    );
}

export default RegisterUser;