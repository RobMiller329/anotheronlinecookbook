import React from "react";
import { useState, useEffect } from "react";
import { EditInstructionsModal, RemoveInstructionsModal } from "./EditInstructionsModal";
import "./StyleRecipeForm.css";

//builds the instructions table for the edit ui; adds modals for the edit and remove buttons
function InstructionsTableBody(props)
{
    const instructionsTableRows = props.instructionsArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td>{row.instructionPhase}</td>
                <td>{row.instructionStep}</td>
                <td>{row.instructionAction}</td>
                <td>
                    <EditInstructionsModal insID={row.instructionDataID} insPhase={row.instructionPhase} insStep={row.instructionStep}
                                                insAct={row.instructionAction} />
                </td>
                <td>
                    <RemoveInstructionsModal insID={row.instructionDataID} insPhase={row.instructionPhase} insStep={row.instructionStep}
                                                insAct={row.instructionAction} />
                </td>
            </tr>
        );
    });

    return(
        <tbody>
            {instructionsTableRows}
        </tbody>
    );
}

function ERInstructionsTable(props)
{
    const [arrayOfIntructions, setArrayOfIntructions] = useState([]);

    //sets the array of instructions on component mount
    useEffect(() =>
    {
        setArrayOfIntructions(props.instructionsArrayFromUI);
    }, [props.instructionsArrayFromUI]);

    return(
        <table>
            <thead>
                <tr>
                    <th>Instruction Phase</th>
                    <th>Step</th>
                    <th>Action</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <InstructionsTableBody instructionsArray={ arrayOfIntructions } />
        </table>
    );
}

export default ERInstructionsTable;
