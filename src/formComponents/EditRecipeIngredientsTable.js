import React from "react";
import { useState, useEffect } from "react";
import "./StyleRecipeForm.css";

function IngredientsTableBody(props)
{
    const ingredientsTableRows = props.ingredientsArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td>{row.ingredientName}</td>
                <td>{row.ingredientQuantity}</td>
                <td>{row.ingredientMeasurement}</td>
                <td>
                    <button type="button" onClick={() => props.editIngredient(row.ingredientName, row.ingredientQuantity, row.ingredientMeasurement, row.ingredientsDataID)}>edit</button>
                </td>
                <td>
                    <button type="button" onClick={() => props.removeIngredient(row.ingredientsDataID)}>remove</button>
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

function ERIngredientsTable(props)
{
    const [arrayOfIngredients, setArrayOfIngredients] = useState([]);

    useEffect(() =>
    {
        setArrayOfIngredients(props.ingredientsArrayFromUI);
    }, [props.ingredientsArrayFromUI]);

    return(
        <table>
            <thead>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Measurement</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <IngredientsTableBody ingredientsArray={ arrayOfIngredients } editIngredient={ props.editIngredientPassedFunction }
                                            removeIngredient={ props.removeIngredientPassedFunction } />
        </table>
    );
}

export default ERIngredientsTable;