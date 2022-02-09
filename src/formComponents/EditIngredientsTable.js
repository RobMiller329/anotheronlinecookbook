import React from "react";
import { useState, useEffect } from "react";
import { EditIngredientsModal, RemoveIngredientsModal } from "./EditIngredientsModal";
import "./StyleRecipeForm.css";

/*  builds the ingredients table with modals for both ingredient editing and removal  */
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
                    <EditIngredientsModal ingID={row.ingredientsDataID} ingName={row.ingredientName} ingQty={row.ingredientQuantity}
                                                ingMsr={row.ingredientMeasurement} />
                </td>
                <td>
                    <RemoveIngredientsModal ingID={row.ingredientsDataID} ingName={row.ingredientName} ingQty={row.ingredientQuantity}
                                                ingMsr={row.ingredientMeasurement} />
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

    //sets the array of ingredients when the component mounts
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
            <IngredientsTableBody ingredientsArray={ arrayOfIngredients } />
        </table>
    );
}

export default ERIngredientsTable;
