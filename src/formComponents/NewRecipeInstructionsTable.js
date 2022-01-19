import React from "react";
import "./StyleRecipeForm.css";

function InstructionsTableHeader()
{
    return(
        <thead>
            <tr>
                <th>Phase</th>
                <th>Step</th>
                <th>Action</th>
                <th></th>
            </tr>
        </thead>
    );
}

function InstructionsTableBody(props)
{
    const instructionsTableRows = props.instructionsArrayFromRender.map((row, index) =>
    {
        if(props.instructionsArrayFromRender.length === 1)
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{index + 1}</td>
                    <td>{row.action}</td>
                    <td>
                    </td>
                </tr>
            );
        }else
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{index + 1}</td>
                    <td>{row.action}</td>
                    <td>
                        <button type="button" onClick={() => props.removeInstruction(index)}>remove</button>
                    </td>
                </tr>
            );
        }
    });

    return(
        <tbody>
            {instructionsTableRows}
        </tbody>
    );
}

class NRInstructionsTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            newRecipeInstructionsArray: []
        }
    }

    render()
    {
        if(this.state.newRecipeInstructionsArray !== this.props.instructionsArrayFromForm)
        {
            this.setState( { newRecipeInstructionsArray: this.props.instructionsArrayFromForm } );
        }

        return(
            <table>
                <InstructionsTableHeader />
                <InstructionsTableBody instructionsArrayFromRender={ this.state.newRecipeInstructionsArray } removeInstructionPassedFromRender={ this.props.removeInstructionPassedFunction } />
            </table>
        );
    }
}

export default NRInstructionsTable;