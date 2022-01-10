import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import ChangePassword from "../loginComponents/ChangePassword";
import ChangeEmail from "../loginComponents/ChangeEmail";

 function Settings(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() =>
    {
        getSession().then(() =>
        {
            setLoggedIn(true);
        });
    }, []);

    return(
        <div>
            {loggedIn && 
            (
                <>
                    <h2>Settings</h2>
                    <ChangePassword />
                    <ChangeEmail />
                </>
            )}
        </div>
    );
 }

 export default Settings;