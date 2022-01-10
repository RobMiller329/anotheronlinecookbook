import React from "react";
import { useState, useEffect, useContext } from "react";
import { Account, AccountContext } from "../loginComponents/Account";
import ChangePassword from "../loginComponents/ChangePassword";
import ChangeEmail from "../loginComponents/ChangeEmail";
import RegisterUser from "../loginComponents/RegisterUser";
import UserLogin from "../loginComponents/Login";
import "../StyleSettings.css"

 function Settings(props)
 {
    const { getSession, logout } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() =>
    {
        getSession().then(() =>
        {
            setLoggedIn(true);
        });
    }, []);

    function UserIsLoggedIn()
    {
        return(
            <div>
                <h2>Settings</h2>
                <ChangePassword />
                <ChangeEmail />
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    function UserNotLoggedIn()
    {
        return(
            <div>
                <Account>
                    <div className="notLoggedInContainer">
                        <div className="settingsUserLogin">
                            <UserLogin />
                        </div>
                        <div className="settingsRegisterUser">
                            <RegisterUser />
                        </div>
                    </div>
                </Account>
            </div>
        );
    }

    return(
        <div>
            {loggedIn && <UserIsLoggedIn />}
            {!loggedIn && <UserNotLoggedIn />}
        </div>
    );
 }

 export default Settings;