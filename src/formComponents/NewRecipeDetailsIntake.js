import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const transactionAPICall = async (api, userID, rawTime, dateTime, adjRecipeName) =>
{
    let postTAPI = await api.post('/transactions/',
    {
        transactionsID: (userID + rawTime),
        transactionDateTime: dateTime,
        userDataID: userID,
        transactionType: "'create'",
        recipeDataID: (userID + adjRecipeName + rawTime)
    });
    console.log("trans api was called");
}

function NRDetailsIntake(props)
{
    const [didSubmit, setDidSubmit] = useState(props.passedSubmittedState);
    const [recipeName, setRecipeName] = useState("");
    const [adjustedRecipeName, setAdjustedRecipeName] = useState("");
    const [recipeSource, setRecipeSource] = useState("");
    const [recipeProtein, setRecipeProtein] = useState("");
    const [recipeCuisine, setRecipeCuisine] = useState("");

    const createRecipeAPI = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/createRecipe/`
        baseURL: `http://localhost:8080/api/createRecipe/`
    });

    /*
        recipeDataID = userID + Adj Recipe Name + raw time
        passedTID (transID)
        passedTDT (trans date time)
        passedUID (user id)
        passedRT (raw time)
    */

    useEffect(() =>
    {
        setAdjustedRecipeName(recipeName.replaceAll(' ', "_"));
    }, [recipeName]);

    useEffect(() =>
    {
        transactionAPICall(createRecipeAPI, props.passedUID, props.passedRT, props.passedTDT, adjustedRecipeName);
        recipeDataAPICall();
    }, [didSubmit]);

    const handleProteinSelection = (event) =>
    {
        setRecipeProtein(event.target.value);
    }

    const handleCuisineSelection = (event) =>
    {
        setRecipeCuisine(event.target.value);
    }

    /* const transactionAPICall = async () =>
    {
        let postTAPI = await createRecipeAPI.post('/transactions/',
        {
            transactionsID: (props.passedUID + props.passedRT),
            transactionDateTime: props.passedTDT,
            userDataID: props.passedUID,
            transactionType: "'create'",
            recipeDataID: (props.passedUID + adjustedRecipeName + props.passedRT)
        });
        console.log(postTAPI);
    } */

    async function recipeDataAPICall()
    {
        try
        {
            let postRDAPI = await createRecipeAPI.post('/recipedata/',
            {
                recipeDataID: (props.passedUID + adjustedRecipeName + props.passedRT),
                recipeSource: recipeSource,
                userDataID: props.passedUID,
                recipeName: recipeName,
                recipeCuisine: recipeCuisine,
                recipeProtein: recipeProtein,
            });

            console.log("recipe api ran!");
        }catch(err)
        {
            console.log(err);
        }
        console.log("reacipe api called");
    }

    return(
        <div>
            <button type="button" onClick={() => transactionAPICall(createRecipeAPI, props.passedUID, props.passedRT, props.passedTDT, adjustedRecipeName)}>test</button>
            <label>Recipe Name:&nbsp;</label>
            <input className="recipeNameInput" type="text" id="recipeNameInput" value={recipeName}
                                    placeholder="enter the recipe name here" onChange={(e) => setRecipeName(e.target.value)} />
            <br/><br/>
            <label>Recipe Source:&nbsp;</label>
            <input className="recipeSourceInput" type="text" id="recipeSourceInput" value={recipeSource}
                                    placeholder="enter the recipe source here" onChange={(e) => setRecipeSource(e.target.value)} />
            <label>&nbsp;(can be a URL, "family recipe", etc)</label>
            <br/><br/>
            <label>Recipe Protein:&nbsp;</label>
            <select id="createProteinDropdown" defaultValue="placeholderProtein" onChange={handleProteinSelection} >
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
            <select id="createCuisineDropdown" defaultValue="placeholderCuisine" onChange={handleCuisineSelection} >
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
    );
}

export default NRDetailsIntake;