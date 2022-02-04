import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import NRDetailsIntake from "./NewRecipeDetailsIntake";
import NRIngredientsIntake from "./NewRecipeIngredientsIntake";
import NRInstructionsIntake from "./NewRecipeInstructionsIntake";
import NRSubmitButton from "./NewRecipeSubmitButton";
import "./StyleRecipeForm.css";

function CreateRecipeForm(props)
{
    return(
        <div>
            <NRDetailsIntake setDetailsObject={props.setDetailsObject} />
            <br/><br/>
            <NRIngredientsIntake setIngredientsArray={props.setIngredientsArray} />
            <br/><br/>
            <NRInstructionsIntake setInstructionsArray={props.setInstructionsArray} />
            <br/><br/>
            <NRSubmitButton userID={props.userID} detailsObject={props.detailsObject} ingredientsArray={props.ingredientsArray} instructionsArray={props.instructionsArray} />
        </div>
    );
}

function UserNotLoggedIn()
{
    return(
        <p>Please login to edit or create a recipe.</p>
    );
}

function NewRecipeForm(props)
{
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDataID, setUserDataID] = useState("");

    const [nrDetailsObject, setNRDetailsObject] = useState( { recipeName: "", adjRecipeName: "", recipeSource: "", recipeProtein: "", recipeCuisine: "" } );
    const [nrIngredients, setNRIngredients] = useState([]);
    const [nrInstructions, setNRInstructions] = useState([]);

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserDataID(email);
        });
    });

    return(
        <div>
            <div className="recipeEditPageHeader">
                <h1>Create a New Recipe</h1>
            </div>
            {<div className="formRender">
                {loggedIn && <CreateRecipeForm setDetailsObject={setNRDetailsObject} setIngredientsArray={setNRIngredients} setInstructionsArray={setNRInstructions}  
                                                userID={userDataID} detailsObject={nrDetailsObject} ingredientsArray={nrIngredients} instructionsArray={nrInstructions} />}
                {!loggedIn && <UserNotLoggedIn />}
            </div>}
        </div>
    );
}

export default NewRecipeForm;