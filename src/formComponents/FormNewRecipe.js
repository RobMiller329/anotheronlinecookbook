import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AccountContext } from "../loginComponents/Account";
import NRDetailsIntake from "./NewRecipeDetailsIntake";
import NRIngredientsTable from "./NewRecipeIngredientsTable";
import NRInstructionsTable from "./NewRecipeInstructionsTable";
import "./StyleRecipeForm.css";

async function recipeDataAPICall(api, userID, adjRecName, time, source, recName, cuisine, protein)
{
    try
    {
        await api.post('/recipeData/insert/',
        {
            recipeDataID: (userID + adjRecName + time),
            recipeSource: source,
            userDataID: userID,
            recipeName: recName,
            recipeCuisine: cuisine,
            recipeProtein: protein
        });
    }catch(err)
    {
        console.log(err);
    }
}

async function ingredientDataAPICall(api, userID, adjRecName, time, count, ingName, ingQty, ingMsr)
{
    try
    {
        await api.post('/recipeIngredients/insert/',
        {
            ingredientsDataID: (userID + adjRecName + time + count),
            ingredientName: ingName,
            recipeDataID: (userID + adjRecName + time),
            ingredientQuantity: ingQty,
            ingredientMeasurement: ingMsr
        });
    }catch(err)
    {
        console.log(err);
    }
}

async function instructionDataAPICall(api, userID, adjRecName, time, count, phase, step, action)
{
    try
    {
        await api.post('/recipeInstructions/insert/',
        {
            instructionDataID: (userID + adjRecName + time + count),
            recipeDataID: (userID + adjRecName + time),
            instructionPhase: phase,
            instructionStep: step,
            instructionAction: action
        });
    }catch(err)
    {
        console.log(err);
    }
}

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDataID, setUserDataID] = useState("");

    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", step: 0, action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );
    
    let dataObjectHolder;

    const createRecipeAPI = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

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

    function handleRecipeDataObject(data)
    {
        dataObjectHolder = data;
    }

    function doubleDigits(int)
    {
        if(int < 10)
        {
            int = "0" + int;
        }

        return int;
    }

    function recipeFormSubmit()
    {
        let today = new Date();
        let year = today.getFullYear();
        let month = doubleDigits(today.getMonth()+1);
        let day = doubleDigits(today.getDate());
        let hours = doubleDigits(today.getHours());
        let minutes = doubleDigits(today.getMinutes());

        let submitTime = year+month+day+hours+minutes;

        recipeDataAPICall(createRecipeAPI, userDataID, dataObjectHolder.adjRecipeName, submitTime, dataObjectHolder.recipeSource,
                                    dataObjectHolder.recipeName, dataObjectHolder.recipeCuisine, dataObjectHolder.recipeProtein);

        for(let x = 1; x < ingredientsArray.length; x++)
        {
            ingredientDataAPICall(createRecipeAPI, userDataID, dataObjectHolder.adjRecipeName, submitTime, doubleDigits(x), ingredientsArray[x].name,
                                    ingredientsArray[x].quantity, ingredientsArray[x].measurement);
        }

        for(let y = 1; y < instructionsArray.length; y++)
        {
            instructionDataAPICall(createRecipeAPI, userDataID, dataObjectHolder.adjRecipeName, submitTime, doubleDigits(y), instructionsArray[y].phase,
                                    y, instructionsArray[y].action);
        }
    };

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form>
                    <div>
                        <NRDetailsIntake passAlongObject={handleRecipeDataObject} />
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
                    <button type="button" className="createRecipeButton" onClick={recipeFormSubmit}>Create Recipe</button>
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