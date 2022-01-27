import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AccountContext } from "../loginComponents/Account";
import NRDetailsIntake from "./NewRecipeDetailsIntake";
import NRIngredientsTable from "./NewRecipeIngredientsTable";
import NRInstructionsTable from "./NewRecipeInstructionsTable";
import "./StyleRecipeForm.css";

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [submittedState, setSubmittedState] = useState(false);

    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", step: 0, action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );

    const [userDataID, setUserDataID] = useState("");
    const [rawTime, setRawTime] = useState(0);
    const [transactionDateTime, setTransactionDateTime] = useState(new Date());
    const [transactionsID, setTransactionsID] = useState("");
    const [recipeDataID, setRecipeDataID] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [adjustedRecipeName, setAdjustedRecipeName] = useState("");
    const [recipeSource, setRecipeSource] = useState("");
    const [recipeProtein, setRecipeProtein] = useState("");
    const [recipeCuisine, setRecipeCuisine] = useState("");
    const [ingredientsString, setIngredientsString] = useState("");
    const [instructionsString, setInstructionsString] = useState("");

    const createRecipeAPI = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/createRecipe/`
        baseURL: `http://localhost:8080/api/createRecipe/`
    });

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserDataID(email);
        });
    });

    useEffect(() =>
    {
        updateIngredientsArray();
    }, [ingredientObject]);

    useEffect(() =>
    {
        updateInstructionsArray();
    }, [instructionObject]);

    function addIngredientsRow()
    {
        let newIngredientName = document.getElementById("ingredientNameToAdd").value;
        let newIngredientQuantity = document.getElementById("ingredientQuantityToAdd").value;
        let newIngredientMeasurement = document.getElementById("ingredientMeasurementToAdd").value;

        setIngredientObject( { name: newIngredientName, quantity: newIngredientQuantity, measurement: newIngredientMeasurement } );
    }

    function updateIngredientsArray()
    {
        let newIngredientsArray = ingredientsArray;
        newIngredientsArray.push(ingredientObject);
        setIngredientsArray(newIngredientsArray);
    }

    const removeIngredient = (index) =>
    {
        let adjustedIngredientsArray = [];

        for(let i = 0; i < ingredientsArray.length; i++)
        {
            if(i !== index)
            {
                adjustedIngredientsArray.push(ingredientsArray[i]);
            }
        }

        setIngredientsArray(adjustedIngredientsArray);
    };

    function addInstructionsRow()
    {
        let newInstructionPhase = document.getElementById("instructionPhaseToAdd").value;
        let newInstructionAction = document.getElementById("instructionActionToAdd").value;

        setInstructionObject( { phase: newInstructionPhase, action: newInstructionAction } );
    }

    function updateInstructionsArray()
    {
        let newInstructionsArray = instructionsArray;
        newInstructionsArray.push(instructionObject);
        setInstructionsArray(newInstructionsArray);
    }

    const removeInstruction = (index) =>
    {
        let adjustedInstructionsArray = instructionsArray.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionUp = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === 1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index - 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionDown = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === -1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index + 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    function recipeFormSubmit()
    {
        function doubleDigits(int)
        {
            if(int < 10)
            {
                int = "0" + int;
            }

            return int;
        }

        let today = new Date();
        let year = today.getFullYear();
        let month = doubleDigits(today.getMonth()+1);
        let day = doubleDigits(today.getDate());
        let hours = doubleDigits(today.getHours());
        let minutes = doubleDigits(today.getMinutes());
        setRawTime(Date.now());
        setTransactionDateTime(year.toString()+month.toString()+day.toString()+hours.toString()+minutes.toString());

        setSubmittedState(true);
        /* 
        let thisIngredientsString = "";
        let thisInstructionsString = "";

        for(let i = 1; i < ingredientsArray.length; i++)
        {
            let ingredientOrder;
            if(i < 10)
            {
                ingredientOrder = "0" + i.toString();
            }else
            {
                ingredientOrder = i.toString();
            }

            let ingredientsDataID = recipeDataID + ingredientOrder;

            thisIngredientsString += "(";
            thisIngredientsString += ingredientsDataID + ", " + ingredientsArray[i].name + ", " + recipeDataID + ", " + 
                                    ingredientsArray[i].quantity + ", " + ingredientsArray[i].measurement;
            if(i < (ingredientsArray.length - 1))
            {
                thisIngredientsString += "),";
            }else
            {
                thisIngredientsString += ")";
            }
        }

        for(let i = 1; i < instructionsArray.length; i++)
        {
            let instructionOrder;
            if(i < 10)
            {
                instructionOrder = "0" + i.toString();
            }else
            {
                instructionOrder = i.toString();
            }

            let instructionDataID = recipeDataID + instructionOrder;

            thisInstructionsString += "(";
            thisInstructionsString += instructionDataID + ", " + recipeDataID + ", " + instructionsArray[i].phase + ", " + instructionsArray[i].step + 
                                    ", " + instructionsArray[i].action;
            if(i < (instructionsArray.length - 1))
            {
                thisInstructionsString += "),";
            }else
            {
                thisInstructionsString += ")";
            }
        } */
    };

    async function constructAPICall()
    {
        let res = await createRecipeAPI.post('/transaction/',
        {
            transactionsID: transactionsID,
            transactionDateTime: transactionDateTime,
            userDataID: userDataID,
            transactionType: "'create'",
            recipeDataID: recipeDataID
        });
        console.log(res);
        console.log("api constructed");
    }

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form>
                    <NRDetailsIntake passedSubmittedState={submittedState} passedTID={transactionsID} passedTDT={transactionDateTime}
                                        passedUID={userDataID} passedRT={rawTime} />
                    <br/>
                    <button type="button" onClick={recipeFormSubmit}>click</button>
                    <div className="ingredientInputContainer">
                        <label className="ingredientInputLabel">Add an ingredient:&nbsp;</label>
                        <input className="ingredientNameInput" type="text" id="ingredientNameToAdd" placeholder="enter the ingredient name here" />
                        <input className="ingredientQtyInput" type="text" id="ingredientQuantityToAdd" placeholder="enter quantity here" />
                        <input className="ingredientMeasureInput" type="text" id="ingredientMeasurementToAdd" placeholder="enter measurement here" />
                        <button className="addIngredientButton" onClick={addIngredientsRow} type="button">add to recipe</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeIngredientsTable">
                        <NRIngredientsTable ingredientsArrayFromForm={ingredientsArray} removeIngredientPassedFunction={removeIngredient} />
                    </div>
                    <br/><br/>
                    <div className="instructionInputContainer">
                        <label className="instructionInputLabel">Add an ingredient:&nbsp;</label>
                        <select className="instructionPhaseSelection" id="instructionPhaseToAdd" defaultValue="placeholderInstructionPhase">
                            <option disabled hidden value="placeholderInstructionPhase">Select a phase.</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Serving">Serving</option>
                            <option value="Other">Other</option>
                        </select>
                        <input className="instructionActionInput" type="text" id="instructionActionToAdd" placeholder="describe the action to be taken" />
                        <button className="addinstructionButton" onClick={addInstructionsRow} type="button">add instruction</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeInstructionTable">
                        <NRInstructionsTable instructionsArrayFromForm={instructionsArray} removeInstructionPassedFunction={removeInstruction}
                                                moveInstructionUpPassedFunction={moveInstructionUp} moveInstructionDownPassedFunction={moveInstructionDown} />
                    </div>
                    <br/><br/>
                    <button type="button" className="createRecipeButton" onClick={recipeFormSubmit}>Create Recipe</button>
                </form>
            </div>
        );
    }

    function UserNotLoggedIn()
    {
        return(
            <p>Please login to edit or create a recipe.</p>
        );
    }

    return(
        <div>
            <div className="recipeEditPageHeader">
                <h1>Create a New Recipe</h1>
            </div>
            <div className="formRender">
                {loggedIn && <CreateRecipeForm />}
                {!loggedIn && <UserNotLoggedIn />}
            </div>
        </div>
    );
}

export default NewRecipeForm;