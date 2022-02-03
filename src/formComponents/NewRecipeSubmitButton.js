import React from "react";
import { useState } from "react";
import Axios from "axios";

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

function NRSubmitButton(props)
{
    const [recipeDataObject, setRecipeDataObject] = useState({});
    const [ingredientsArray, setIngredientsArray] = useState(props.ingredientsArray);
    const [instructionsArray, setInstructionsArray] = useState(props.instructionsArray);

    const createRecipeAPI = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

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

        /* recipeDataAPICall(createRecipeAPI, userDataID, adjustedRecipeName, submitTime, recipeSource,
            recipeName, recipeCuisine, recipeProtein);

        for(let x = 1; x < ingredientsArray.length; x++)
        {
            ingredientDataAPICall(createRecipeAPI, userDataID, adjustedRecipeName, submitTime, doubleDigits(x), ingredientsArray[x].name,
                                    ingredientsArray[x].quantity, ingredientsArray[x].measurement);
        }

        for(let y = 1; y < instructionsArray.length; y++)
        {
            instructionDataAPICall(createRecipeAPI, userDataID, adjustedRecipeName, submitTime, doubleDigits(y), instructionsArray[y].phase,
                                    y, instructionsArray[y].action);
        } */
    };

    return(
        <button type="button" onClick={recipeFormSubmit}>
            press this
        </button>
    );
}

export default NRSubmitButton;