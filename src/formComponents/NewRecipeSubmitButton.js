import React from "react";
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
        alert("Your recipe has been created!");
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
        console.log("ingredients api posted");
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
        console.log("instructions api posted");
    }catch(err)
    {
        console.log(err);
    }
}

function NRSubmitButton(props)
{
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

    function submitRecipe()
    {
        console.log(props);

        let today = new Date();
        let year = today.getFullYear();
        let month = doubleDigits(today.getMonth()+1);
        let day = doubleDigits(today.getDate());
        let hours = doubleDigits(today.getHours());
        let minutes = doubleDigits(today.getMinutes());

        let submitTime = year+month+day+hours+minutes;

        recipeDataAPICall(createRecipeAPI, props.userID, props.detailsObject.adjRecipeName, submitTime, props.detailsObject.recipeSource,
                                    props.detailsObject.recipeName, props.detailsObject.recipeCuisine, props.detailsObject.recipeProtein);

        for(let x = 1; x < props.ingredientsArray.length; x++)
        {
            console.log("ingredients array [" + x + "]");
            ingredientDataAPICall(createRecipeAPI, props.userID, props.detailsObject.adjRecipeName, submitTime, doubleDigits(x), props.ingredientsArray[x].name,
                                    props.ingredientsArray[x].quantity, props.ingredientsArray[x].measurement);
        }

        for(let y = 1; y < props.instructionsArray.length; y++)
        {
            instructionDataAPICall(createRecipeAPI, props.userID, props.detailsObject.adjRecipeName, submitTime, doubleDigits(y), props.instructionsArray[y].phase,
                                    y, props.instructionsArray[y].action);
        }
    }

    return(
        <div>
            <button type="button" onClick={submitRecipe}>Submit</button>
        </div>
    );
}

export default NRSubmitButton;