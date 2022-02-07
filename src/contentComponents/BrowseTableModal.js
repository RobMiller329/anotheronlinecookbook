import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import Axios from "axios";

function RecipeHeaderBody(props)
{
    return(
        <tbody>
            <tr>
                <td>{props.headerObject.name}</td>
                <td>{props.headerObject.source}</td>
                <td>{props.headerObject.user}</td>
            </tr>
        </tbody>
    );
}

function RecipeIngredientsBody(props)
{
    const recipeIngredientRows = props.ingredientsArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td>{row.ingredientName}</td>
                <td>{row.ingredientQuantity}</td>
                <td>{row.ingredientMeasurement}</td>
            </tr>
        );
    });

    return(
        <tbody>
            { recipeIngredientRows }
        </tbody>
    );
}

function RecipeInstructionsBody(props)
{
    const recipeInstructionRows = props.instructionsArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td>{row.instructionPhase}</td>
                <td>{row.instructionStep}</td>
                <td>{row.instructionAction}</td>
            </tr>
        );
    });

    return(
        <tbody>
            { recipeInstructionRows }
        </tbody>
    );
}

export const BrowseTableModal = (props) =>
{
    const [recipeHeader, setRecipeHeader] = useState( { id: "", name: "", source: "", user: "" } );
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const recipeDataAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    function fetchRecipeData()
    {
        setOpen(o => !o);

        async function recipeHeaderCall()
        {
            try
            {
                let returnedData = await recipeDataAPICall.get(`/fetch/${props.recipeID}`).then(( { data } ) => data);
                setRecipeHeader( { id: returnedData[0].recipeDataID, name: returnedData[0].recipeName, source: returnedData[0].recipeSource, user: returnedData[0].userName } );
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeHeaderCall()

        async function recipeIngredientsCall()
        {
            try
            {
                let returnedIngredients = await recipeDataAPICall.get(`/recipeIngredients/select/${props.recipeID}`).then(( { data } ) => data);
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
                let returnedInstructions = await recipeDataAPICall.get(`/recipeInstructions/select/${props.recipeID}`).then(( { data } ) => data);
                setRecipeInstructions(returnedInstructions);
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeInstructionsCall()
    }

    return(
        <div>
            <button type="button" className="viewRecipeOpenButton" onClick={ () => fetchRecipeData() }>view recipe</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="viewRecipeContainer">
                    <div className="comingSoonModal">
                        <div className="viewRecipeHeader">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Recipe Name</th>
                                        <th>Source</th>
                                        <th>Submitted By</th>
                                    </tr>
                                </thead>
                                <RecipeHeaderBody headerObject={ recipeHeader } />
                            </table>
                        </div>
                        <div className="viewRecipeIngredients">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ingredient Name</th>
                                        <th>Quantity</th>
                                        <th>Measurement</th>
                                    </tr>
                                </thead>
                                <RecipeIngredientsBody ingredientsArray={ recipeIngredients } />
                            </table>
                        </div>
                        <div className="viewRecipeInstructions">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Instruction Phase</th>
                                        <th>Step</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <RecipeInstructionsBody instructionsArray={ recipeInstructions } />
                            </table>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
}