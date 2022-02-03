import React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import Axios from "axios";
import { AccountContext } from "../loginComponents/Account";
import NRDetailsIntake from "./NewRecipeDetailsIntake";
import NRIngredientsTable from "./NewRecipeIngredientsTable";
import NRInstructionsTable from "./NewRecipeInstructionsTable";
import NRSubmitButton from "./NewRecipeSubmitButton";
import "./StyleRecipeForm.css";

function NewRecipeForm(props)
{
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDataID, setUserDataID] = useState("");

    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );

    const types = 
    {
        RECIPENAME: "RECIPENAME",
        ADJUSTEDRECIPENAME: "RECIPEADJUSTEDNAME",
        RECIPESOURCE: "RECIPESOURCE",
        RECIPEPROTEIN: "RECIPEPROTEIN",
        RECIPECUISINE: "RECIPECUISINE"
    }

    const reducer = (state, action) =>
    {
        switch(action.type)
        {
            case types.RECIPENAME:
                return { ...state, recipename: action.value}
            case types.ADJUSTEDRECIPENAME:
                return { ...state, adjustedrecipename: action.value}
            case types.RECIPESOURCE:
                return { ...state, recipesource: action.value}
            case types.RECIPEPROTEIN:
                return { ...state, recipeprotein: action.value}
            case types.RECIPECUISINE:
                return { ...state, recipecuisine: action.value}
            default:
                break;
        }
    }

    const initialState = 
    {
        recipename: "",
        adjustedrecipename: "",
        recipesource: "",
        recipeprotein: "",
        recipecuisine: ""
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserDataID(email);
        });
    });

    useEffect(() =>
    {
        updateIngredientsArray();
    }, [ingredientObject]);

    useEffect(() =>
    {
        updateInstructionsArray();
    }, [instructionObject]);

    function addIngredientsRow()
    {
        let newIngredientName = document.getElementById("ingredientNameToAdd").value;
        let newIngredientQuantity = document.getElementById("ingredientQuantityToAdd").value;
        let newIngredientMeasurement = document.getElementById("ingredientMeasurementToAdd").value;

        setIngredientObject( { name: newIngredientName, quantity: newIngredientQuantity, measurement: newIngredientMeasurement } );
    }

    function updateIngredientsArray()
    {
        let newIngredientsArray = ingredientsArray;
        newIngredientsArray.push(ingredientObject);
        setIngredientsArray(newIngredientsArray);
    }

    const removeIngredient = (index) =>
    {
        let adjustedIngredientsArray = [];

        for(let i = 0; i < ingredientsArray.length; i++)
        {
            if(i !== index)
            {
                adjustedIngredientsArray.push(ingredientsArray[i]);
            }
        }

        setIngredientsArray(adjustedIngredientsArray);
    };

    function addInstructionsRow()
    {
        let newInstructionPhase = document.getElementById("instructionPhaseToAdd").value;
        let newInstructionAction = document.getElementById("instructionActionToAdd").value;

        setInstructionObject( { phase: newInstructionPhase, action: newInstructionAction } );
    }

    function updateInstructionsArray()
    {
        let newInstructionsArray = instructionsArray;
        newInstructionsArray.push(instructionObject);
        setInstructionsArray(newInstructionsArray);
    }

    const removeInstruction = (index) =>
    {
        let adjustedInstructionsArray = instructionsArray.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionUp = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === 1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index - 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionDown = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === -1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index + 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form>
                    <div>
                        <div>
                            <label>Recipe Name:&nbsp;</label>
                            <input className="recipeNameInput" type="text" id="recipeNameInput" value={state.recipename} placeholder="enter the recipe name here"
                                                    onChange={ (event) => { dispatch( {type: types.RECIPENAME, value: event.target.value} ) } } />
                        </div>
                        <div>
                            <label>Recipe Source:&nbsp;</label>
                            <input className="recipeSourceInput" type="text" id="recipeSourceInput" value={state.recipesource} placeholder="enter the recipe source here"
                                                    onChange={ (event) => { dispatch( {type: types.RECIPESOURCE, value: event.target.value} ) } } />
                            <label>&nbsp;(can be a URL, "family recipe", etc)</label>
                        </div>
                        <div>
                            <label>Recipe Protein:&nbsp;</label>
                            <select id="createProteinDropdown" defaultValue="placeholderProtein"
                                                    onChange={ (event) => { dispatch( {type: types.RECIPEPROTEIN, value: event.target.value} ) } } >
                                <option disabled hidden value="placeholderProtein">Select a protein.</option>
                                <option value="Beef">Beef</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Fish">Fish</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Other">Other</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                        <div>
                            <label>Recipe Cuisine:&nbsp;</label>
                            <select id="createCuisineDropdown" defaultValue="placeholderCuisine"
                                                    onChange={ (event) => { dispatch( {type: types.RECIPECUISINE, value: event.target.value} ) } } >
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
                        </div>
                    </div>
                    <br/>
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
                        <NRInstructionsTable instructionsArrayFromForm={instructionsArray} removeInstructionPassedFunction={removeInstruction}
                                                moveInstructionUpPassedFunction={moveInstructionUp} moveInstructionDownPassedFunction={moveInstructionDown} />
                    </div>
                    <br/><br/>
                    <NRSubmitButton ingredientsArray={ingredientsArray} instructionsArray={instructionsArray} />
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