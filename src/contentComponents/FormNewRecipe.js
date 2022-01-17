import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import "./StyleRecipeForm.css";

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [ingredientsObject, setIngredientsObject] = useState( { phase: "", step: 0, action: "" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );
    const [instructionObject, setInstructionObject] = useState( { phase: "", step: 0, action: "" } );
    const [instructionArray, setInstructionArray] = useState( [] );

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    const IngredientsTableHeader = () =>
    {
        return(
            <thead>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Measurement</th>
                    <th></th>
                </tr>
            </thead>
        );
    }

    const IngredientsTableBody = (props) =>
    {
        const ingredientsTableRows = ingredientsArray.map((row, index) =>
        {
            return(
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                    <td>{row.measurement}</td>
                    <td>
                        <button type="button" onClick={removeIngredient}>remove</button>
                    </td>
                </tr>
            );
        });

        return(
            <tbody>
                {ingredientsTableRows}
            </tbody>
        );
    }

    function IngredientsTableBuild(props)
    {
        return(
            <table>
                <IngredientsTableHeader />
                <IngredientsTableBody />
            </table>
        );
    }

    const InstructionsTableHeader = () =>
    {
        return(
            <thead>
                <tr>
                    <th>Phase</th>
                    <th>Step</th>
                    <th>Action</th>
                </tr>
            </thead>
        );
    }

    const InstructionsTableBody = (props) =>
    {
        const instructionTableRows = instructionArray.map((row, index) =>
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{row.step}</td>
                    <td>{row.action}</td>
                    <td>
                        <button type="button" onClick={removeInstruction}>remove</button>
                    </td>
                </tr>
            );
        });

        return(
            <tbody>
                {instructionTableRows}
            </tbody>
        );
    }

    function InstructionsTableBuild(props)
    {
        return(
            <table>
                <InstructionsTableHeader />
                <InstructionsTableBody />
            </table>
        );
    }

    function addIngredientsRow()
    {
        let tempIngredientsArray = ingredientsArray;

        let nameToAdd = document.getElementById("ingredientNameToAdd").value;
        let quantityToAdd = document.getElementById("ingredientQuantityToAdd").value;
        let measurementToAdd = document.getElementById("ingredientMeasurementToAdd").value;

        setIngredientsObject( { name: nameToAdd, quantity: quantityToAdd, measurement: measurementToAdd } );
        tempIngredientsArray.push(ingredientsObject);
        setIngredientsArray(tempIngredientsArray);

        document.getElementById("ingredientNameToAdd").value="";
        document.getElementById("ingredientQuantityToAdd").value="";
        document.getElementById("ingredientMeasurementToAdd").value="";

        console.log(ingredientsArray);
    }

    function addInstructionRow()
    {
        let tempInstructionArray = instructionArray;

        let phaseToAdd = document.getElementById("instructionPhaseToAdd").value;
        let stepToAdd = document.getElementById("instructionStepToAdd").value;
        let actionToAdd = document.getElementById("instructionActionToAdd").value;

        setInstructionObject( { phase: phaseToAdd, step: stepToAdd, action: actionToAdd } );
        tempInstructionArray.push(instructionObject);
        setInstructionArray(tempInstructionArray);

        document.getElementById("instructionPhaseToAdd").value="";
        document.getElementById("instructionStepToAdd").value="";
        document.getElementById("instructionActionToAdd").value="";

        console.log(instructionArray);
    }

    const removeIngredient = (index) =>
    {
        //let {instructions} = instructionData;
        let newInstructionObjectArray;

        //newInstructionObjectArray = instructions.filter((instruction, i) =>
        newInstructionObjectArray = instructionArray.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionArray(newInstructionObjectArray);
    };

    const removeInstruction = (index) =>
    {
        //let {instructions} = instructionData;
        let newInstructionObjectArray;

        //newInstructionObjectArray = instructions.filter((instruction, i) =>
        newInstructionObjectArray = instructionArray.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionArray(newInstructionObjectArray);
    };

    const onSubmit = (event) =>
    {
        event.preventDefault();

        let rawTime = Date.now();
        let transactionDateTime = new Date();
        let transactionsID = (userEmail+rawTime);
        let userDataID = userEmail;
        let transactionType = "create";
        let recipeName = document.getElementById("recipeNameInput").value;
        let recipeDataID = (userEmail+recipeName+rawTime);
        let recipeSource = document.getElementById("recipeSourceInput").value;
        let recipeProtein = document.getElementById("createProteinDropdown").value;
        let recipeCuisine = document.getElementById("createCuisineDropdown").value;
    };

    function CreateRecipeForm()
    {        
        return(
            <div>
                <form onSubmit={onSubmit}>
                    <label>Recipe Name:&nbsp;</label>
                    <input className="recipeNameInput" type="text" id="recipeNameInput" placeholder="enter the recipe name here" />
                    <br/><br/>
                    <label>Recipe Source:&nbsp;</label>
                    <input className="recipeSourceInput" type="text" id="recipeSourceInput" placeholder="enter the recipe source here" />
                    <label>&nbsp;(can be a URL, "family recipe", etc)</label>
                    <br/><br/>
                    <label>Recipe Protein:&nbsp;</label>
                    <select id="createProteinDropdown" defaultValue="placeholderProtein">
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
                    <select id="createCuisineDropdown" defaultValue="placeholderCuisine">
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
                    <br/><br/>
                    <div className="ingredientInputContainer">
                        <label className="ingredientInputLabel">Add an ingredient:&nbsp;</label>
                        <input className="ingredientNameInput" type="text" id="ingredientNameToAdd" placeholder="enter the ingredient name here" />
                        <input className="ingredientQtyInput" type="text" id="ingredientQuantityToAdd" placeholder="enter quantity here" />
                        <input className="ingredientMeasureInput" type="text" id="ingredientMeasurementToAdd" placeholder="enter measurement here" />
                        <button className="addIngredientButton" onClick={addIngredientsRow} type="button">add to recipe</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeIngredientsTable">
                        <IngredientsTableBuild />
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
                        <input className="instructionStepInput" type="number" id="instructionStepToAdd" placeholder="enter which step" />
                        <input className="instructionActionInput" type="text" id="instructionActionToAdd" placeholder="describe the action to be taken" />
                        <button className="addinstructionButton" onClick={addInstructionRow} type="button">add instruction</button>
                    </div>
                    <br/><br/>
                    <div className="createRecipeInstructionTable">
                        <InstructionsTableBuild />
                    </div>
                    <br/><br/>
                    <button type="submit" className="createRecipeButton">Create Recipe</button>
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