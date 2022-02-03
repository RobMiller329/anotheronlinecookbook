import React from "react";
import { useState, useEffect } from "react";

/* async function recipeDataAPICall(didSubmit, userID, adjRecipeName, rawTime, source, recName, cuisine, protein)
{
    console.log(didSubmit);
    const createRecipeAPI = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    try
    {
        await createRecipeAPI.post('/recipeData/insert/',
        {
            recipeDataID: (userID + adjRecipeName + rawTime),
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
} */

function NRDetailsIntake(props)
{
    const [recipeName, setRecipeName] = useState("");
    const [adjustedRecipeName, setAdjustedRecipeName] = useState("");
    const [recipeSource, setRecipeSource] = useState("");
    const [recipeProtein, setRecipeProtein] = useState("");
    const [recipeCuisine, setRecipeCuisine] = useState("");
    const [recipeDataObject, setRecipeDataObject] = useState({
                                                                adjRecipeName: "",
                                                                recipeSource: "",
                                                                userDataID: "",
                                                                recipeName: "",
                                                                recipeCuisine: "",
                                                                recipeProtein: ""
                                                            });

    /*
        recipeDataID = userID + Adj Recipe Name + raw time
        passedTID (transID)
        passedTDT (trans date time)
        passedUID (user id)
        passedRT (raw time)
    */

/*     useEffect(() =>
    {
        setAdjustedRecipeName(recipeName.replaceAll(' ', "_"));
    }, [recipeName]); */

    useEffect(() =>
    {
        setAdjustedRecipeName(recipeName.replaceAll(' ', "_"));
        setRecipeDataObject({
            adjRecipeName: adjustedRecipeName,
            recipeSource: recipeSource,
            recipeName: recipeName,
            recipeCuisine: recipeCuisine,
            recipeProtein: recipeProtein
        });
        props.passAlongObject(recipeDataObject);
    }, [recipeName, recipeSource, recipeProtein, recipeCuisine]);

    const handleProteinSelection = (event) =>
    {
        setRecipeProtein(event.target.value);
    }

    const handleCuisineSelection = (event) =>
    {
        setRecipeCuisine(event.target.value);
    }

    return(
        <div>
            <div>
                <label>Recipe Name:&nbsp;</label>
                <input className="recipeNameInput" type="text" id="recipeNameInput" value={recipeName}
                                        placeholder="enter the recipe name here" onChange={(e) => setRecipeName(e.target.value)} />
            </div>
            <div>
                <label>Recipe Source:&nbsp;</label>
                <input className="recipeSourceInput" type="text" id="recipeSourceInput" value={recipeSource}
                                        placeholder="enter the recipe source here" onChange={(e) => setRecipeSource(e.target.value)} />
                <label>&nbsp;(can be a URL, "family recipe", etc)</label>
            </div>
            <div>
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
            </div>
            <div>
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
        </div>
    );
}

export default NRDetailsIntake;