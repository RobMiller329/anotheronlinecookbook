import React from "react";
import { useState, useEffect } from "react";

function DetailsIntake(props)
{
    const [recipeName, setRecipeName] = useState("");
    const [adjustedRecipeName, setAdjustedRecipeName] = useState("");
    const [recipeSource, setRecipeSource] = useState("");
    const [recipeProtein, setRecipeProtein] = useState("");
    const [recipeCuisine, setRecipeCuisine] = useState("");
    const [recipeDataObject, setRecipeDataObject] = useState( { recipeName: "", adjustedRecipeName: "", recipeSource: "", recipeProtein: "", recipeCuisine: "" } );

    useEffect(() =>
    {
        setAdjustedRecipeName(recipeName.replaceAll(' ', "_"));
        setRecipeDataObject( { recipeName: recipeName, adjustedRecipeName: adjustedRecipeName, recipeSource: recipeSource, recipeProtein: recipeProtein, recipeCuisine: recipeCuisine } );
    }, [recipeName, recipeSource, recipeProtein, recipeCuisine]);

    useEffect(() =>
    {
        passingDetailsObjectToParent(recipeDataObject);
    }, [recipeDataObject]);

    const handleProteinSelection = (event) =>
    {
        setRecipeProtein(event.target.value);
    }

    const handleCuisineSelection = (event) =>
    {
        setRecipeCuisine(event.target.value);
    }

    const passingDetailsObjectToParent = (dataObject) =>
    {
        props.setDetailsObject(dataObject);
    }

    return(
        <div>
            <div>
                <label>Recipe Name:&nbsp;</label>
                <input type="text" value={recipeName} placeholder="enter the recipe name here" onChange={ (event) => setRecipeName(event.target.value) } />
            </div>
            <div>
                <label>Recipe Source:&nbsp;</label>
                <input type="text" value={recipeSource} placeholder="enter the recipe source here" onChange={ (event) => setRecipeSource(event.target.value) } />
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

export default DetailsIntake;