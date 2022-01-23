import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import EditDetailsTable from "./TableEditDetails";
import { AccountContext } from "../loginComponents/Account";
import { editIngredientsColumns, editInstructionsColumns } from "./EditRecipeColumns";
import "./StyleRecipeForm.css";

function CreateRecipeSelectionList(props)
{
    if(props.recipesToSelectFrom.length > 0)
    {
        let dropdownMenu = document.getElementById("selectRecipeDropdown");
        
        for(let i = 0; i < props.recipesToSelectFrom.length; i++)
        {
            let currentItemName = props.recipesToSelectFrom[i].recipeName;
            let currentItemValue = props.recipesToSelectFrom[i].recipeDataID;

            let createdOption = document.createElement("option");
            createdOption.textContent = currentItemName;
            createdOption.value = currentItemValue;
            dropdownMenu.appendChild(createdOption);
        }

        return(
            <div>
                <select id="selectRecipeDropdown" defaultValue="placeholderRecipeSelection">
                    <option disabled hidden value="placeholderRecipeSelection">Select a recipe to edit.</option>
                </select>
                <button type="button" onClick={() => props.fetchDataFunction(document.getElementById("selectRecipeDropdown").value)}>edit recipe</button>
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

function SelectedRecipeHeader(props)
{
    let recipeName, recipeSource, recipeProtein, recipeCuisine;

    for(let i = 0; i < props.recipesToSelectFrom.length; i++)
    {
        if(props.recipesToSelectFrom[i].recipeDataID === props.currentOption)
        {
            recipeName = props.recipesToSelectFrom[i].recipeName;
            recipeSource = props.recipesToSelectFrom[i].recipeSource;
            recipeProtein = props.recipesToSelectFrom[i].recipeProtein;
            recipeCuisine = props.recipesToSelectFrom[i].recipeCuisine;
        }
    }

    return(
        <div className="editSelectedRecipeHeaderContainer">
            <div className="editRecipeHeaderName">
                <h2>Recipe:&nbsp;</h2>
                <h2>{recipeName}</h2>
            </div>
            <div className="editRecipeHeaderSource">
                <h2>Source:&nbsp;</h2>
                <h2>{recipeSource}</h2>
            </div>
            <div className="editRecipeHeaderProtein">
                <h2>Protein:&nbsp;</h2>
                <h2>{recipeProtein}</h2>
            </div>
            <div className="editRecipeHeaderCuisine">
                <h2>Cuisine:&nbsp;</h2>
                <h2>{recipeCuisine}</h2>
            </div>
        </div>
    );
}

function EditRecipeTable(props)
{
    const { getSession } = useContext(AccountContext);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [highlightedRecipe, setHighlightedRecipe] = ("")

    const recipeDataAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api`
    });

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
                    console.log(Date.now());
                }catch(err)
                {
                    console.log(err);
                }
            }
            fetchListData();
        });
    }, []);

    function fetchRecipeData(recipeID)
    {
        async function recipeIngredientsCall()
        {
            try
            {
                let returnedIngredients = await recipeDataAPICall.get(`/recipeIngredients/${recipeID}`).then(( { data } ) => data);
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
                let returnedInstructions = await recipeDataAPICall.get(`/recipeInstructions/${recipeID}`).then(( { data } ) => data);
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
            <EditDetailsTable columns={editIngredientsColumns} data={recipeIngredients} />
            <EditDetailsTable columns={editInstructionsColumns} data={recipeInstructions} />
        </div>
    );
}

export default EditRecipeTable;