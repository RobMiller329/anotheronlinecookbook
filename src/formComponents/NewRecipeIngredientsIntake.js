import React from "react";
import { useState, useEffect } from "react";
import NRIngredientsTable from "./NewRecipeIngredientsTable";

function NRIngredientsIntake(props)
{
    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );

    //updates the array when the ingredient object is updated
    useEffect(() =>
    {
        updateIngredientsArray();
    }, [ingredientObject]);

    //when the ingredients array is updated, resent the array up to the parent
    useEffect(() =>
    {
        passingIngredientsArrayToParent(ingredientsArray);
    }, [ingredientsArray]);

    const passingIngredientsArrayToParent = (ingArray) =>
    {
        props.setIngredientsArray(ingArray);
    }

    //creates the ingredient object; by updating the ingredient object state, it calls the array update function (via useEffect)
    function addIngredientsRow()
    {
        let newIngredientName = document.getElementById("ingredientNameToAdd");
        let newIngredientQuantity = document.getElementById("ingredientQuantityToAdd");
        let newIngredientMeasurement = document.getElementById("ingredientMeasurementToAdd");

        setIngredientObject( { name: newIngredientName.value, quantity: newIngredientQuantity.value, measurement: newIngredientMeasurement.value } );

        newIngredientName.value = "";
        newIngredientQuantity.value = "";
        newIngredientMeasurement.value = "";
        newIngredientName.focus();
    }

    //pushes the new ingredient object onto the array
    function updateIngredientsArray()
    {
        const newIngredientsArray = [...ingredientsArray];
        newIngredientsArray.push(ingredientObject);
        setIngredientsArray(newIngredientsArray);
    }

    //removes an ingredient by looping through the array and only re-adding ingredients that don't match the selected ingredient
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

    return(
        <div>
            <form className="ingredientInputContainer">
                    <label className="ingredientInputLabel">Add an ingredient:&nbsp;</label>
                    <input className="ingredientNameInput" type="text" id="ingredientNameToAdd" placeholder="enter the ingredient name here" />
                    <input className="ingredientQtyInput" type="text" id="ingredientQuantityToAdd" placeholder="enter quantity here" />
                    <input className="ingredientMeasureInput" type="text" id="ingredientMeasurementToAdd" placeholder="enter measurement here" />
                    <button className="addIngredientButton" onClick={addIngredientsRow} type="button">add to recipe</button>
            </form>
            <div>
                <NRIngredientsTable ingredientsArrayFromForm={ingredientsArray} removeIngredientPassedFunction={removeIngredient} />
            </div>
        </div>
    );
}

export default NRIngredientsIntake;
