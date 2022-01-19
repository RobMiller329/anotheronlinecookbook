import React from "react";
import "./StyleRecipeForm.css";

function IngredientsTableHeader()
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

function IngredientsTableBody(props)
{
    console.log(props.ingredientsArrayFromRender);
    const ingredientsTableRows = props.ingredientsArrayFromRender.map((row, index) =>
    {
        if(props.ingredientsArrayFromRender.length === 1)
        {
            return(
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                    <td>{row.measurement}</td>
                    <td>
                    </td>
                </tr>
            );
        }else
        {
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

class NRIngredientsTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            newRecipeIngredientsArray: []
        }
    }

    render()
    {
        if(this.state.newRecipeIngredientsArray !== this.props.ingredientsArrayFromForm)
        {
            this.setState( { newRecipeIngredientsArray: this.props.ingredientsArrayFromForm } );
        }

        return(
            <table>
                <IngredientsTableHeader />
                <IngredientsTableBody ingredientsArrayFromRender={ this.state.newRecipeIngredientsArray } removeIngredientPassedFromRender={ this.props.removeIngredientPassedFunction } />
            </table>
        );
    }
}

export default NRIngredientsTable;