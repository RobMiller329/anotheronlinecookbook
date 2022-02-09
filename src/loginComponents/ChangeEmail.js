import React from "react";
import { useState, useContext } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { AccountContext } from "./Account";

function ChangeEmail(props)
{
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const { getSession, authenticate, logout } = useContext(AccountContext);

    let emailElement = document.getElementById("newEmailID");
    let confirmElement = document.getElementById("confirmID");
    let passwordElement = document.getElementById("passwordID");

    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(newEmail !== confirmEmail)           //if both email inputs don't match, reject input
        {
            alert("New Email and Confirm New Email must match exactly.");
        }else
        {
            getSession().then(( { user, email } ) =>
            {
                authenticate(email, password).then(() =>
                {
                    const attributes = [new CognitoUserAttribute( { Name: "email", Value: newEmail } )];

                    user.updateAttributes(attributes, (err, results) =>
                    {
                        if(err)
                        {
                            alert("Email change failed. Error provided: " + err);
                        }else
                        {
                            alert("Email has been changed successfully. You will be logged out; please log in with your new email.");
                            emailElement.value = "";
                            confirmElement.value = "";
                            passwordElement.value = "";
                            logout();
                            window.location.reload(false);
                        }
                    });
                });
            });
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <p>Use the following form to change the email associated to your account.</p>
                <br/>
                <label>New Email</label>
                <br/>
                <input id="newEmailID" type="email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} />
                <br/><br/>
                <label>Confirm New Email</label>
                <br/>
                <input id="confirmID" type="email" value={confirmEmail} onChange={(event) => setConfirmEmail(event.target.value)} />
                <br/><br/>
                <label>Current Password</label>
                <br/>
                <input id="passwordID" type="email" value={password} onChange={(event) => setPassword(event.target.value)} />
                <br/><br/>
                <button type="submit">Change Email</button>
            </form>
        </div>
    );
}

export default ChangeEmail;
