import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import "./StyleRecipeForm.css";

 function NewRecipeForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [instructionData, setInstructionData] = useState( { phase: "", step: "", action: "" } );

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    function addIngredientRow()
    {
        var ingredName = document.getElementById("ingredientNameToAdd").value;
        var ingredQty = document.getElementById("ingredientQuantityToAdd").value;
        var ingredMsr = document.getElementById("ingredientMeasurementToAdd").value;
        var remvButt = document.getElementById("removeIngredientButton");

        if(ingredName === "" || ingredQty === "" || ingredMsr === "")
        {
            alert("Please enter values for all fields before adding an ingredient.");
        }else
        {
            var newRow = document.createElement('tr');
            var nameCol = document.createElement('td');
            var qtyCol = document.createElement('td');
            var msrCol = document.createElement('td');
            var buttCol = document.createElement('td');
            var newName = document.createTextNode(ingredName);
            var newQty = document.createTextNode(ingredQty);
            var newMsr = document.createTextNode(ingredMsr);
            var newButt = remvButt.cloneNode(true);

            nameCol.appendChild(newName);
            qtyCol.appendChild(newQty);
            msrCol.appendChild(newMsr);
            buttCol.appendChild(newButt);
            newRow.appendChild(nameCol);
            newRow.appendChild(qtyCol);
            newRow.appendChild(msrCol);
            newRow.appendChild(buttCol);
    
            document.getElementById("ingredientTableBody").appendChild(newRow);

            document.getElementById("ingredientNameToAdd").value="";
            document.getElementById("ingredientQuantityToAdd").value="";
            document.getElementById("ingredientMeasurementToAdd").value="";
        }
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
        const instructionTableRows = props.dataToPass.map((row, index) =>
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{row.step}</td>
                    <td>{row.action}</td>
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
        let {passedData} = props.passedInstructionData;

        return(
            <table>
                <InstructionsTableHeader />
                <InstructionsTableBody dataToPass={passedData} />
            </table>
        );
    }

    const removeTableRow = (event) =>
    {
        var rowID = event.target.parentNode.parentNode.id;
        document.getElementById(rowID).remove();
    }

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
                        <button className="addIngredientButton" onClick={addIngredientRow} type="button">add to recipe</button>
                    </div>
                    <br/><br/>
                    <table className="createRecipeIngredientTable">
                        <thead>
                            <tr>
                                <th id="ingredientNameTableHeader">Ingredient Name</th>
                                <th id="ingredientQuantityTableHeader">Ingredient Quantity</th>
                                <th id="ingredientMeasurementTableHeader">Ingredient Measurement</th>
                                <th id="ingredientRowRemoveButton"></th>
                            </tr>
                        </thead>
                        <tbody id="ingredientTableBody">
                            <tr>
                                <td>(example) brown sugar</td>
                                <td>3/4</td>
                                <td>cup</td>
                                <td><button type="button" id="removeIngredientButton" onClick={removeTableRow}>remove</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/><br/>
                    <InstructionsTableBuild passedInstructionData={instructionData} />
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