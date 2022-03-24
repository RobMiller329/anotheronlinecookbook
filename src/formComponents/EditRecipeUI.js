import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import ERIngredientsTable from "./EditIngredientsTable";
import ERInstructionsTable from "./EditInstructionsTable";
import { AccountContext } from "../loginComponents/Account";
import "./StyleRecipeForm.css";

/*
    this component feeds into the primary edit ui component
    CreateRecipeSelectionList is used to build out the drop down and handle
    selections made on it
*/
function CreateRecipeSelectionList(props)
{
    //when a selection is made, pass the values upward
    function handleSelection()
    {
        props.fetchDataFunction(document.getElementById("selectRecipeDropdown").value);
        props.highlightCurrentOption(document.getElementById("selectRecipeDropdown").value);
    }

    //as long as the user has recipes to choose from, build the list
    if(props.recipesToSelectFrom.length > 0)
    {
        let dropdownMenu = document.getElementById("selectRecipeDropdown");

        //add each of the user's recipes as an option in the dropdown
        for(let i = 0; i < props.recipesToSelectFrom.length; i++)
        {
            let currentItemName = props.recipesToSelectFrom[i].recipeName;
            let currentItemValue = props.recipesToSelectFrom[i].recipeDataID;
            let optionCheck = 0;

            let createdOption = document.createElement("option");
            createdOption.textContent = currentItemName;
            createdOption.value = currentItemValue;

            /*  in order to make sure duplicate options aren't inserted on state changes, values are checked against
                existing options and only added if no matches are found  */
            for(var currentOptions of dropdownMenu.options)
            {
                if(createdOption.value === currentOptions.value)
                {
                    optionCheck += 1;
                }
            }

            if(optionCheck === 0)
            {
                dropdownMenu.appendChild(createdOption);
            }
        }

        return(
            <div>
                <select id="selectRecipeDropdown" defaultValue="placeholderRecipeSelection" onChange={handleSelection}>
                    <option disabled hidden value="placeholderRecipeSelection">Select a recipe to edit.</option>
                </select>
            </div>
        );
    }else
    {
        return(
            <div>
                <select id="selectRecipeDropdown" defaultValue="placeholderRecipeSelection">
                    <option disabled hidden value="placeholderRecipeSelection">Select a recipe to edit.</option>
                    <option value="NA">You do not currently have any saved recipes on this account.</option>
                </select>
            </div>
        );
    }
}

/*
    this component feeds into the primary edit ui component
    SelectedRecipeHeader populates the header values after a selection is made
*/
function SelectedRecipeHeader(props)
{
    let selectedRecipeName, selectedRecipeSource, selectedRecipeProtein, selectedRecipeCuisine;

    for(let i = 0; i < props.recipesToSelectFrom.length; i++)
    {
        if(props.recipesToSelectFrom[i].recipeDataID === props.currentOption)
        {
            selectedRecipeName = props.recipesToSelectFrom[i].recipeName;
            selectedRecipeSource = props.recipesToSelectFrom[i].recipeSource;
            selectedRecipeProtein = props.recipesToSelectFrom[i].recipeProtein;
            selectedRecipeCuisine = props.recipesToSelectFrom[i].recipeCuisine;
        }
    }

    return(
        <div className="editSelectedRecipeHeaderContainer">
            <div className="editRecipeHeaderName">
                <h2>Recipe:&nbsp;</h2>
                <h2>{selectedRecipeName}</h2>
            </div>
            <div className="editRecipeHeaderSource">
                <h2>Source:&nbsp;</h2>
                <h2>{selectedRecipeSource}</h2>
            </div>
            <div className="editRecipeHeaderProtein">
                <h2>Protein:&nbsp;</h2>
                <h2>{selectedRecipeProtein}</h2>
            </div>
            <div className="editRecipeHeaderCuisine">
                <h2>Cuisine:&nbsp;</h2>
                <h2>{selectedRecipeCuisine}</h2>
            </div>
        </div>
    );
}

function EditRecipeUI(props)
{
    const { getSession } = useContext(AccountContext);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [highlightedRecipe, setHighlightedRecipe] = useState("");

    const recipeDataAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api`
    });

    //on component mount, calls for the data to populate the list of recipes
    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            async function fetchListData()
            {
                try
                {
                    let returnedData = await recipeDataAPICall.get(`/recipeList/${email}`).then(( { data } ) => data);
                    setRecipeList(returnedData);
                }catch(err)
                {
                    console.log(err);
                }
            }
            fetchListData();
        });
    }, []);

    //after a recipe is selected, the data for the ingredients and instructions tables are called
    function fetchRecipeData(recipeID)
    {
        async function recipeIngredientsCall()
        {
            try
            {
                let returnedIngredients = await recipeDataAPICall.get(`/recipeIngredients/select/${recipeID}`).then(( { data } ) => data);
                setRecipeIngredients(returnedIngredients);
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeIngredientsCall()

        async function recipeInstructionsCall()
        {
            try
            {
                let returnedInstructions = await recipeDataAPICall.get(`/recipeInstructions/select/${recipeID}`).then(( { data } ) => data);
                setRecipeInstructions(returnedInstructions);
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeInstructionsCall()
    }

    return (
        <div className="editRecipeFormContainer">
            <CreateRecipeSelectionList recipesToSelectFrom={recipeList} fetchDataFunction={fetchRecipeData} highlightCurrentOption={setHighlightedRecipe} />
            <SelectedRecipeHeader currentOption={highlightedRecipe} recipesToSelectFrom={recipeList} />
            <br/>
            <ERIngredientsTable ingredientsArrayFromUI={recipeIngredients} recipeID={highlightedRecipe} />
            <ERInstructionsTable instructionsArrayFromUI={recipeInstructions} recipeID={highlightedRecipe} />
        </div>
    );
}

export default EditRecipeUI;