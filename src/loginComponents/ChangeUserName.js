import React from "react";
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";

async function changeUsername(username)
{
    //update username api
}

function ChangeUsername(props)
{
    const { getSession } = useContext(AccountContext);
    const [userDataID, setUserDataID] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [confirmUsername, setConfirmUsername] = useState("");

    let usernameElement = document.getElementById("newUsernameID");
    let confirmElement = document.getElementById("confirmNewUsername");
    let minUsernameLength = 6;
    let maxUsernameLength = 16;

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setUserDataID(email);
        });
    });

    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(newUsername < minUsernameLength || newUsername.length > maxUsernameLength)
        {
            alert("Usernames must be between 6 and 16 characters.");
        }else if(newUsername !== confirmUsername)
        {
            alert("New Username and Confirm Username must match exactly.");
        }else
        {
            changeUsername(newUsername);
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <p>Use the following form to change your username.</p>
                <br/>
                <label>New Username</label>
                <br/>
                <input id="newUsernameID" value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                <br/><br/>
                <label>Confirm New Username</label>
                <br/>
                <input id="confirmNewUsername" value={confirmUsername} onChange={(event) => setConfirmUsername(event.target.value)} />
                <br/><br/>
                <button type="submit">Change Username</button>
            </form>
        </div>
    );
}

export default ChangeUsername;