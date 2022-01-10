import React from "react";
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

function Status(props)
{
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() =>
    {
        getSession().then((session) =>
        {
            console.log("Session: ", session);
            setStatus(true);
        });
    }, []);

    //I strongly dislike how the only way I could get that if statement to work is to do the ? shorthand. I hate that shorthand.
    return(
        <div>
            { status ? <button onClick={logout}>Logout</button> : "Please login" }
        </div>
    );
}

export default Status;