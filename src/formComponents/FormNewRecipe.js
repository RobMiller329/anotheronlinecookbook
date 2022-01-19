import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import NRIngredientsTable from "./NewRecipeIngredientsTable";
import NRInstructionsTable from "./NewRecipeInstructionsTable";
import "./StyleRecipeForm.css";

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", step: 0, action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    useEffect(() =>
    {
        let newIngredientsArray = ingredientsArray;
        newIngredientsArray.push(ingredientObject);
        setIngredientsArray(newIngredientsArray);
    }, [ingredientObject, ingredientsArray]);

    useEffect(() =>
    {
        let newInstructionsArray = instructionsArray;
        newInstructionsArray.push(instructionObject);
        setInstructionsArray(newInstructionsArray);
    }, [instructionObject, instructionsArray]);

    function addIngredientsRow()
    {
        let newIngredientName = document.getElementById("ingredientNameToAdd").value;
        let newIngredientQuantity = document.getElementById("ingredientQuantityToAdd").value;
        let newIngredientMeasurement = document.getElementById("ingredientMeasurementToAdd").value;

        setIngredientObject( { name: newIngredientName, quantity: newIngredientQuantity, measurement: newIngredientMeasurement } );
    }

    const removeIngredient = (index) =>
    {
        const { ingredientsData } = ingredientsArray;

        let adjustedIngredientsArray = ingredientsData.filter((ingredient, i) =>
        {
            return(
                i !== index
            );
        });

        setIngredientsArray(adjustedIngredientsArray);
    };

    function addInstructionsRow()
    {
        let newInstructionPhase = document.getElementById("ingredientNameToAdd").value;
        let newInstructionAction = document.getElementById("ingredientMeasurementToAdd").value;

        setInstructionObject( { phase: newInstructionPhase, action: newInstructionAction } );
    }

    const removeInstruction = (index) =>
    {
        const { instructionsData } = instructionsArray;

        let adjustedInstructionsArray = instructionsData.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionsArray(adjustedInstructionsArray);
    };

    const onSubmit = (event) =>
    {
        event.preventDefault();

        /* let rawTime = Date.now();
        let transactionDateTime = new Date();
        let transactionsID = (userEmail+rawTime);
        let userDataID = userEmail;
        let transactionType = "create";
        let recipeName = document.getElementById("recipeNameInput").value;
        let recipeDataID = (userEmail+recipeName+rawTime);
        let recipeSource = document.getElementById("recipeSourceInput").value;
        let recipeProtein = document.getElementById("createProteinDropdown").value;
        let recipeCuisine = document.getElementById("createCuisineDropdown").value; */
    };

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form onSubmit={onSubmit}>
                    <label>Recipe Name:&nbsp;</label>
                    <input className="recipeNameInput" type="text" id="recipeNameInput" placeholder="enter the recipe name here" />
                    <br/><br/>
                    <label>Recipe Source:&nbsp;</label>
                    <input className="recipeSourceInput" type="text" id="recipeSourceInput" placeholder="enter the recipe source here" />
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
                    <div className="ingredientInputContainer">
                        <label className="ingredientInputLabel">Add an ingredient:&nbsp;</label>
                        <input className="ingredientNameInput" type="text" id="ingredientNameToAdd" placeholder="enter the ingredient name here" />
                        <input className="ingredientQtyInput" type="text" id="ingredientQuantityToAdd" placeholder="enter quantity here" />
                        <input className="ingredientMeasureInput" type="text" id="ingredientMeasurementToAdd" placeholder="enter measurement here" />
                        <button className="addIngredientButton" onClick={addIngredientsRow} type="button">add to recipe</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeIngredientsTable">
                        <NRIngredientsTable ingredientsArrayFromForm={ingredientsArray} removeIngredientPassedFunction={removeIngredient} />
                    </div>
                    <br/><br/>
                    <div className="instructionInputContainer">
                        <label className="instructionInputLabel">Add an ingredient:&nbsp;</label>
                        <select className="instructionPhaseSelection" id="instructionPhaseToAdd" defaultValue="placeholderInstructionPhase">
                            <option disabled hidden value="placeholderInstructionPhase">Select a phase.</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Serving">Serving</option>
                            <option value="Other">Other</option>
                        </select>
                        <input className="instructionActionInput" type="text" id="instructionActionToAdd" placeholder="describe the action to be taken" />
                        <button className="addinstructionButton" onClick={addInstructionsRow} type="button">add instruction</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeInstructionTable">
                        <NRInstructionsTable instructionsArrayFromForm={instructionsArray} removeInstructionPassedFunction={removeInstruction} />
                    </div>
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