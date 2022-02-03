import React from "react";
import { useState, useEffect, useContext } from "react";
import { Account, AccountContext } from "../loginComponents/Account";
import ChangePassword from "../loginComponents/ChangePassword";
import ChangeEmail from "../loginComponents/ChangeEmail";
import RegisterUser from "../loginComponents/RegisterUser";
import UserLogin from "../loginComponents/Login";
import ChangeUsername from "../loginComponents/ChangeUserName";
import "../StyleSettings.css"

 function Settings(props)
 {
    const { getSession, logout } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    function handleLogOut()
    {
        alert("You have logged out.");
        logout();
        window.location.reload(false);
    }

    function UserIsLoggedIn()
    {
        return(
            <div className="loggedInContainer">
                <div className="settingsLogoutContainer">
                    <div className="logoutWords1"><p>You are logged in as &nbsp;</p></div>
                    <div className="userEmailAddress">{userEmail}</div>
                    <div className="logoutWords2"><p>. Click this button to log out.</p></div>
                    <button onClick={handleLogOut} className="settingsLogoutButton">Logout</button>
                </div>
                <div className="settingsChangesContainer">
                    <div className="settingsChangeEmail">
                        <ChangeEmail />
                    </div>
                    <div className="settingsUsername">
                        <ChangeUsername userEmail={userEmail} />
                    </div>
                    <div className="settingsChangePassword">
                        <ChangePassword />
                    </div>
                </div>
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
            <div className="settingsPageHeader">
                <h1>Settings</h1>
            </div>
            {loggedIn && <UserIsLoggedIn />}
            {!loggedIn && <UserNotLoggedIn />}
        </div>
    );
 }

 export default Settings;