import React from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";

function ChangePassword(props)
{
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { getSession } = useContext(AccountContext);

    let currentPasswordElement = document.getElementById("currentPasswordID");
    let newPasswordElement = document.getElementById("newPasswordID");
    let confirmPasswordElement = document.getElementById("confirmPasswordID");


    const onSubmit = (event) =>
    {
        event.preventDefault();

        if(newPassword !== confirmPassword)
        {
            alert("New Password and Confirm New Password must match exactly.");
        }else
        {
            getSession().then(( { user } ) =>
            {
                user.changePassword(password, newPassword, (err, result) =>
                {
                    if(err)
                    {
                        alert("Password change failed. Error provided: " + err);
                    }else
                    {
                        alert("Password has been changed successfully.");
                        currentPasswordElement.value = "";
                        newPasswordElement.value = "";
                        confirmPasswordElement.value = "";
                    }
                })
            });
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <p>Use the following form to change the password associated to your account.</p>
                <br/>
                <label>Current Password</label>
                <br/>
                <input id="currentPasswordID" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <br/><br/>
                <label>New Password</label>
                <br/>
                <input id="newPasswordID" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                <br/><br/>
                <label>Confirm New Password</label>
                <br/>
                <input id="confirmPasswordID" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                <br/><br/>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;