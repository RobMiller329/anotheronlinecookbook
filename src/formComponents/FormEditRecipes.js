import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import EditRecipeTable from "./EditRecipeTable";
import "./StyleRecipeForm.css";

 function EditRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userRecipeList, setUserRecipeList] = useState([]);
    const [recipeSelected, setRecipeSelected] = useState("");

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    function UserNotLoggedIn()
    {
        return(
            <p>Please login to edit or create a recipe.</p>
        );
    }

    return(
        <div>
            <div className="recipeEditPageHeader">
                <h1>Edit My Recipes</h1>
            </div>
            <div className="formRender">
                {loggedIn && <EditRecipeTable userID={userEmail} />}
                {!loggedIn && <UserNotLoggedIn />}
            </div>
        </div>
    );
}

export default EditRecipeForm;