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
                <td>{props.headerObject.recipeName}</td>
                <td>{props.headerObject.recipeSource}</td>
                <td>{props.headerObject.creatorUsername}</td>
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
    const [browsingUserID, setBrowsingUserID] = useState("");
    const [recipeHeader, setRecipeHeader] = useState( { recipeDataID: "", recipeName: "", recipeSource: "", creatorUsername: "", creatorEmail: "" } );
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [favoriteRecipe, setFavoriteRecipe] = useState(false);
    const [followCreator, setFollowCreator] = useState(false);
    const [notesData, setNotesData] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const recipeDataAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        //baseURL: `http://localhost:8080/api/`
        baseURL: `https://anotheronlinecookbook.herokuapp.com/api/`
    });

    //returns all parts of the recipe from separate API calls
    function fetchRecipeData()
    {
        setOpen(status => !status);

        setBrowsingUserID(props.userEmail);

        async function recipeHeaderCall()
        {
            try
            {
                let returnedData = await recipeDataAPICall.get(`/fetch/${props.recipeID}`).then(( { data } ) => data);
                setRecipeHeader( { recipeDataID: returnedData[0].recipeDataID, recipeName: returnedData[0].recipeName, recipeSource: returnedData[0].recipeSource, 
                                        creatorUsername: returnedData[0].userName, creatorEmail: returnedData[0].userDataID } );
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

        recipeNotesCall();
    }

    async function recipeNotesCall()
    {
        let recordID = props.userEmail + props.recipeID;

        try
        {
            let returnedNotes = await recipeDataAPICall.get(`/notes/select/${recordID}`).then(( { data } ) => data);
            setNotesData(returnedNotes[0].commentaryMessage);
        }catch(err)
        {
            console.log(err);
        }
    }

    function favoritingRecipe()
    {
        async function createFavoriteRecipeRecord()
        {
            try
            {
                await recipeDataAPICall.post('/favorite/insert/',
                {
                    favoritesDataID: (browsingUserID + recipeHeader.recipeDataID),
                    favoritesDataType: "recipe",
                    userDataID: browsingUserID,
                    favoritesDataItemID: recipeHeader.recipeDataID
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
        let recordID = browsingUserID + recipeHeader.recipeDataID;
        
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
                    favoritesDataID: (browsingUserID + recipeHeader.creatorEmail),
                    favoritesDataType: "creator",
                    userDataID: browsingUserID,
                    favoritesDataItemID: recipeHeader.creatorEmail
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
        let recordID = browsingUserID + recipeHeader.creatorEmail;
        
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
            <Popup modal open={open} closeOnDocumentClick onClose={closeModal} nested className="browseRecipesPopup">
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
                        <div className="notesSectionHeader">
                            <div className="notesSectionTitle">
                                <span>Recipe Notes</span>
                            </div>
                            <div className="notesSectionSubtitle">
                                <span>these notes are only visible to you</span>
                            </div>
                        </div>
                        <br/><br/>
                        <BTMNotes text={notesData} userID={browsingUserID} recipeID={recipeHeader.recipeDataID} refreshNotes={recipeNotesCall} />
                    </div>
                </div>
            </Popup>
        </div>
    );
}
