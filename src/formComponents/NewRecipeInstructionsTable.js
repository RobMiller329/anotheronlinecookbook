import React from "react";
import { useState, useEffect } from "react";
import "./StyleRecipeForm.css";

function InstructionsTableBody(props)
{
    /*  builds the table based on the instructions array length; NEEDS REFACTORING  */
    const instructionsTableRows = props.instructionsArray.map((row, index) =>
    {
        if(props.instructionsArray.length === 1)            //if the example is the only element in the array
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{index + 1}</td>
                    <td>{row.action}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }else if(props.instructionsArray.length === 2)      //only one additional element in the array
        {
            switch(index)
            {
                case 0:                                     //for index 0 (the example), don't append any buttons
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    );
                default:                                    //otherwise, add a button that triggers the removeInstruction function from props 
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td></td>
                            <td></td>
                            <td>
                                <button type="button" onClick={() => props.removeInstruction(index)}>remove</button>
                            </td>
                        </tr>
                    );
            }
        }else
        {
            /*  with more than one added instruction, we need to append both a remove button and a button to move the instruction up or down on the list  */
            switch(index)
            {
                case 0:                                                     //no buttons needed for the example
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    );
                case 1:                                                     //the top non-example instruction doesn't need a move up button
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td>
                                <button type="button" onClick={() => props.moveInstructionDown(index)}>move down</button>
                            </td>
                            <td></td>
                            <td>
                                <button type="button" onClick={() => props.removeInstruction(index)}>remove</button>
                            </td>
                        </tr>
                    );
                case (props.instructionsArrayLength - 1):                   //the bottom insutrction doesn't need a move down button
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td></td>
                            <td>
                                <button type="button" onClick={() => props.moveInstructionUp(index)}>move up</button>
                            </td>
                            <td>
                                <button type="button" onClick={() => props.removeInstruction(index)}>remove</button>
                            </td>
                        </tr>
                    );
                default:                        //every added instruction that isn't first or last needs both a move up and move down button
                    return(
                        <tr key={index}>
                            <td>{row.phase}</td>
                            <td>{index + 1}</td>
                            <td>{row.action}</td>
                            <td>
                                <button type="button" onClick={() => props.moveInstructionDown(index)}>move down</button>
                            </td>
                            <td>
                                <button type="button" onClick={() => props.moveInstructionUp(index)}>move up</button>
                            </td>
                            <td>
                                <button type="button" onClick={() => props.removeInstruction(index)}>remove</button>
                            </td>
                        </tr>
                    );
            }
        }
    });

    return(
        <tbody>
            {instructionsTableRows}
        </tbody>
    );
}

function NRInstructionsTable(props)
{
    const [arrayOfInstructions, setArrayOfInstructions] = useState([]);

    //pulls the array from props and sets the state with it
    useEffect(() =>
    {
        setArrayOfInstructions(props.instructionsArrayFromForm);
    }, [props.instructionsArrayFromForm]);

    return(
        <table>
            <thead>
                <tr>
                    <th>Phase</th>
                    <th>Step</th>
                    <th>Action</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <InstructionsTableBody instructionsArray={ arrayOfInstructions } instructionsArrayLength={ arrayOfInstructions.length } removeInstruction={ props.removeInstructionPassedFunction }
                                    moveInstructionUp={ props.moveInstructionUpPassedFunction } moveInstructionDown={ props.moveInstructionDownPassedFunction } />
        </table>
    );
}

export default NRInstructionsTable;
