import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Axios from "axios";
import BTMNotes from "./BTMNotesComp";
import './StyleBrowseModal.css';

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
        <tbody className="browseModalIngredientsBody">
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

function FavoriteRecipeButton(props)
{
    let favRecButtReturned;

    switch(props.favoriteBool)
    {
        case true:
            favRecButtReturned = <button type="button" className="filledFavoriteRecipeButton" onClick={ () => props.toUnfavorite() } />
            break;
        case false:
            favRecButtReturned = <button type="button" className="emptyFavoriteRecipeButton" onClick={ () => props.toFavorite() } />
            break;
        default:
            favRecButtReturned = <button type="button" className="emptyFavoriteRecipeButton" onClick={ () => props.toFavorite() } />
            break;
    }

    return( <div className="favRecipeButtContainer">{ favRecButtReturned }</div> );
}

function FollowCreatorButton(props)
{
    let folCreatButtReturned;

    switch(props.followBool)
    {
        case true:
            folCreatButtReturned = <button type="button" className="filledFollowCreatorButton" onClick={ () => props.toUnfollow() } />
            break;
        case false:
            folCreatButtReturned = <button type="button" className="emptyFollowCreatorButton" onClick={ () => props.toFollow() } />
            break;
        default:
            folCreatButtReturned = <button type="button" className="emptyFollowCreatorButton" onClick={ () => props.toFollow() } />
            break;
    }

    return( <div className="followCreatorButtContainer">{ folCreatButtReturned }</div> );
}

export const BrowseTableModal = (props) =>
{
    const [userID, setUserID] = useState("");
    const [recipeHeader, setRecipeHeader] = useState( { id: "", name: "", source: "", user: "", email: "" } );
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [favoriteRecipe, setFavoriteRecipe] = useState(false);
    const [followCreator, setFollowCreator] = useState(false);
    const [notesData, setNotesData] = useState( { text: "", email: "", recipe: "" } );
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const recipeDataAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    //returns all parts of the recipe from separate API calls
    function fetchRecipeData()
    {
        setOpen(o => !o);

        setUserID(props.userEmail);

        async function recipeHeaderCall()
        {
            try
            {
                let returnedData = await recipeDataAPICall.get(`/fetch/${props.recipeID}`).then(( { data } ) => data);
                setRecipeHeader( { id: returnedData[0].recipeDataID, name: returnedData[0].recipeName, source: returnedData[0].recipeSource, 
                                    user: returnedData[0].userName, email: returnedData[0].userDataID } );
                setNotesData( { ...notesData, email: returnedData[0].userDataID, recipe: returnedData[0].recipeDataID } );
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeHeaderCall();

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
        recipeIngredientsCall();

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
        recipeInstructionsCall();

        async function favoriteRecipeCall()
        {
            let recordID = props.userEmail + props.recipeID;

            try
            {
                let returnedFavorite = await recipeDataAPICall.get(`/favorite/select/${recordID}`).then(( { data } ) => data);

                if(returnedFavorite[0].favoritesDataID === recordID)
                {
                    setFavoriteRecipe(true);
                }
            }catch(err)
            {
                console.log(err);
            }
        }
        favoriteRecipeCall();

        async function followCreatorCall()
        {
            let recordID = props.userEmail + props.creatorID;

            try
            {
                //favorite recipe and follow creator apis are the same because of a shared db table
                let returnedFollow = await recipeDataAPICall.get(`/favorite/select/${recordID}`).then(( { data } ) => data);

                if(returnedFollow[0].favoritesDataID === recordID)
                {
                    setFollowCreator(true);
                }
            }catch(err)
            {
                console.log(err);
            }
        }
        followCreatorCall();

        async function recipeNotesCall()
        {
            let recordID = props.userEmail + props.recipeID;

            try
            {
                let returnedNotes = await recipeDataAPICall.get(`/notes/select/${recordID}`).then(( { data } ) => data);
                setNotesData( { ...notesData, text: returnedNotes } );
            }catch(err)
            {
                console.log(err);
            }
        }
        recipeNotesCall();
    }

    function favoritingRecipe()
    {
        async function createFavoriteRecipeRecord()
        {
            try
            {
                await recipeDataAPICall.post('/favorite/insert/',
                {
                    favoritesDataID: (userID + recipeHeader.id),
                    favoritesDataType: "recipe",
                    userDataID: userID,
                    favoritesDataItemID: recipeHeader.id
                });
                alert("Recipe added to favorites!");
            }catch(err)
            {
                console.log(err);
            }
        }
        createFavoriteRecipeRecord();

        setFavoriteRecipe(true);
    }

    function unfavoritingRecipe()
    {
        let recordID = userID + recipeHeader.id;
        
        async function deleteFavoriteRecipeRecord()
        {
            try
            {
                await recipeDataAPICall.delete(`/favorite/delete/${recordID}`);
                alert("Recipe removed from favorites.");
            }catch(err)
            {
                console.log(err);
            }
        }
        deleteFavoriteRecipeRecord();

        setFavoriteRecipe(false);
    }

    function followingCreator()
    {
        async function createFollowCreatorRecord()
        {
            try
            {
                //favorite recipe and follow creator apis are the same because of a shared db table
                await recipeDataAPICall.post('/favorite/insert/',
                {
                    favoritesDataID: (userID + recipeHeader.email),
                    favoritesDataType: "creator",
                    userDataID: userID,
                    favoritesDataItemID: recipeHeader.email
                });
                alert("You are now following this creator!");
            }catch(err)
            {
                console.log(err);
            }
        }
        createFollowCreatorRecord();

        setFollowCreator(true);
    }

    function unfollowingCreator()
    {
        let recordID = userID + recipeHeader.email;
        
        async function deleteFollowCreatorRecord()
        {
            try
            {
                //favorite recipe and follow creator apis are the same because of a shared db table
                await recipeDataAPICall.delete(`/favorite/delete/${recordID}`);
                console.log(recordID);
                alert("You are no longer following this creator.");
            }catch(err)
            {
                console.log(err);
            }
        }
        deleteFollowCreatorRecord();

        setFollowCreator(false);
    }

    return(
        <div className="browseModalContainer">
            <button type="button" className="viewRecipeOpenButton" onClick={ () => fetchRecipeData() }>view recipe</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="viewRecipeContainer">
                    <div className="viewRecipeModalButtons">
                        <div className="favoriteRecipeButtonLabel">
                            <span>Favorite this recipe:</span>
                        </div>
                        <FavoriteRecipeButton favoriteBool={favoriteRecipe} toFavorite={favoritingRecipe} toUnfavorite={unfavoritingRecipe} />
                        <div className="followCreatorButtonLabel">
                            <span>Follow this recipe creator:</span>
                        </div>
                        <FollowCreatorButton followBool={followCreator} toFollow={followingCreator} toUnfollow={unfollowingCreator} />
                    </div>
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
                    <div className="viewRecipeNotes">
                        <span>Recipe Notes:</span>
                        <br/>
                        <span>these notes are only visible to you</span>
                        <br/><br/>
                        <BTMNotes notes={notesData} recipeID={recipeHeader.id} />
                    </div>
                </div>
            </Popup>
        </div>
    );
}
