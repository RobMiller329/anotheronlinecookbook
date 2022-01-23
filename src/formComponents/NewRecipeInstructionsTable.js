import React from "react";
import { useState, useEffect } from "react";
import "./StyleRecipeForm.css";

function InstructionsTableBody(props)
{
    const instructionsTableRows = props.instructionsArray.map((row, index) =>
    {
        if(props.instructionsArray.length === 1)
        {
            return(
                <tr key={index}>
                    <td>{row.phase}</td>
                    <td>{index + 1}</td>
                    <td>{row.action}</td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            );
        }else if(props.instructionsArray.length === 2)
        {
            switch(index)
            {
                case 0:
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
                default:
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
            switch(index)
            {
                case 0:
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
                case 1:
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
                case (props.instructionsArrayLength - 1):
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
                default:
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