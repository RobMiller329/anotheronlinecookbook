import React from "react";
import { useState, useEffect } from "react";
import "./StyleRecipeForm.css";

function IngredientsTableBody(props)
{
    const ingredientsTableRows = props.ingredientsArray.map((row, index) =>
    {
        switch(index)
        {
            case 0:
                return(
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.quantity}</td>
                        <td>{row.measurement}</td>
                        <td></td>
                    </tr>
                );
            default:
                return(
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.quantity}</td>
                        <td>{row.measurement}</td>
                        <td>
                            <button type="button" onClick={() => props.removeIngredient(index)}>remove</button>
                        </td>
                    </tr>
                );
        }
    });

    return(
        <tbody>
            {ingredientsTableRows}
        </tbody>
    );
}

function NRIngredientsTable(props)
{
    const [arrayOfIngredients, setArrayOfIngredients] = useState([]);

    useEffect(() =>
    {
        setArrayOfIngredients(props.ingredientsArrayFromForm);
    }, [props.ingredientsArrayFromForm]);

    return(
        <table>
            <thead>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Quantity</th>
                    <th>Measurement</th>
                    <th></th>
                </tr>
            </thead>
            <IngredientsTableBody ingredientsArray={ arrayOfIngredients } removeIngredient={ props.removeIngredientPassedFunction } />
        </table>
    );
}

export default NRIngredientsTable;