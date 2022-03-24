import React from "react";
import { useState, useEffect, useContext } from "react";
import { Account, AccountContext } from "../loginComponents/Account";
import Axios from "axios";
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
    const [username, setUsername] = useState("");

    const apiCall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    //pulls user data on component mount
    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);

            async function fetchUsername()
            {
                try
                {
                    let returnedName = await apiCall.get(`/username/${email}`).then(( { data } ) => data);
                    setUsername(returnedName[0].userName);
                }catch(err)
                {
                    console.log(err);
                }
            }
            fetchUsername();
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
                    <div className="loggedInAs"><p>You are logged in as &nbsp;</p></div>
                    <div className="username">{username}</div>
                    <div className="loggedInAs"><p>&nbsp;(</p></div>
                    <div className="userEmailAddress">{userEmail}</div>
                    <div className="loggedInAs"><p>). Click this button to log out.</p></div>
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
