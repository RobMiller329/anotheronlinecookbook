import React from "react";
import { useState, useEffect } from "react";
import NRIngredientsTable from "../formComponents/NewRecipeIngredientsTable";

function IngredientsIntake(props)
{
    const [ingredientObject, setIngredientObject] = useState( { name: "example", quantity: "2/3", measurement: "cup" } );
    const [ingredientsArray, setIngredientsArray] = useState( [] );

    useEffect(() =>
    {
        updateIngredientsArray();
    }, [ingredientObject]);

    useEffect(() =>
    {
        passingIngredientsArrayToParent(ingredientsArray);
    }, [ingredientsArray]);

    const passingIngredientsArrayToParent = (ingArray) =>
    {
        props.setIngredientsArray(ingArray);
    }

    function addIngredientsRow()
    {
        let newIngredientName = document.getElementById("ingredientNameToAdd").value;
        let newIngredientQuantity = document.getElementById("ingredientQuantityToAdd").value;
        let newIngredientMeasurement = document.getElementById("ingredientMeasurementToAdd").value;

        setIngredientObject( { name: newIngredientName, quantity: newIngredientQuantity, measurement: newIngredientMeasurement } );
    }

    function updateIngredientsArray()
    {
        const newIngredientsArray = [...ingredientsArray];
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

export default IngredientsIntake;