import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import "./StyleRecipeForm.css";

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [recipeNameInput, setRecipeNameInput] = useState("");
    const [recipeSourceInput, setRecipeSourceInput] = useState("");

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    const onSubmit = (event) =>
    {
        event.preventDefault();

        let rawTime = Date.now();
        let transactionDateTime = new Date();
        let transactionsID = (userEmail+rawTime);
        let userDataID = userEmail;
        let transactionType = "create";
        let recipeName = recipeNameInput;
        let recipeDataID = (userEmail+recipeNameInput+rawTime);
        let recipeSource = recipeSourceInput;
        //trying this two different ways; the first I know should work, but the second is more efficient
        let selectedProtein = document.querySelector("createProteinDropdown");
        let recipeProtein = selectedProtein.value;
        let recipeCuisine = document.querySelector("createCuisineDropdown").value;
    };

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form onSubmit={onSubmit}>
                    <label>Recipe Name:&nbsp;</label>
                    <input type="text" value={recipeNameInput} onChange={ (event) => setRecipeNameInput(event.target.value) } required />
                    <br/><br/>
                    <label>Recipe Source:&nbsp;</label>
                    <input type="text" value={recipeSourceInput} onChange={ (event) => setRecipeSourceInput(event.target.value) } />
                    <label>&nbsp;(can be a URL, "family recipe", etc)</label>
                    <br/><br/>
                    <label>Recipe Protein:&nbsp;</label>
                    <select id="createProteinDropdown" defaultValue="placeholderProtein">
                        <option disabled hidden value="placeholderProtein">Select a protein.</option>
                        <option value="Beef">Beef</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Fish">Fish</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Other">Other</option>
                        <option value="None">None</option>
                    </select>
                    <br/><br/>
                    <label>Recipe Cuisine:&nbsp;</label>
                    <select id="createCuisineDropdown" defaultValue="placeholderCuisine">
                        <option disabled hidden value="placeholderCuisine">Select a cuisine.</option>
                        <option value="American">American</option>
                        <option value="Cajun">Cajun</option>
                        <option value="Chinese">Chinese</option>
                        <option value="French">French</option>
                        <option value="Indian">Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Soul">Soul</option>
                        <option value="Thai">Thai</option>
                        <option value="Other">Other</option>
                    </select>
                    <br/><br/>
                    <button type="submit" className="createRecipeButton">Create Recipe</button>
                </form>
            </div>
        );
    }

    function UserNotLoggedIn()
    {
        return(
            <p>Please login to edit or create a recipe.</p>
        );
    }

    return(
        <div>
            <div className="recipeEditPageHeader">
                <h1>Create a New Recipe</h1>
            </div>
            <div className="formRender">
                {loggedIn && <CreateRecipeForm />}
                {!loggedIn && <UserNotLoggedIn />}
            </div>
        </div>
    );
}

export default NewRecipeForm;