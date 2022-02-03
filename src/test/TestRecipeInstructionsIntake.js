import React from "react";
import { useState, useEffect } from "react";
import NRInstructionsTable from "../formComponents/NewRecipeInstructionsTable";

function InstructionsIntake(props)
{
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );

    useEffect(() =>
    {
        updateInstructionsArray();
    }, [instructionObject]);

    useEffect(() =>
    {
        passingInstructionsArrayToParent(instructionsArray);
    }, [instructionsArray]);

    const passingInstructionsArrayToParent = (insArray) =>
    {
        props.setInstructionsArray(insArray);
    }

    function addInstructionsRow()
    {
        let newInstructionPhase = document.getElementById("instructionPhaseToAdd").value;
        let newInstructionAction = document.getElementById("instructionActionToAdd").value;

        setInstructionObject( { phase: newInstructionPhase, action: newInstructionAction } );
    }

    function updateInstructionsArray()
    {
        const newInstructionsArray = [...instructionsArray];
        newInstructionsArray.push(instructionObject);
        setInstructionsArray(newInstructionsArray);
    }

    const removeInstruction = (index) =>
    {
        let adjustedInstructionsArray = instructionsArray.filter((instruction, i) =>
        {
            return(
                i !== index
            );
        });

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionUp = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === 1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index - 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    const moveInstructionDown = (index) =>
    {
        let adjustedInstructionsArray = [];

        for(let i = 0; i < instructionsArray.length; i++)
        {    
            if((index - i) === -1)
            {
                adjustedInstructionsArray.push(instructionsArray[index]);
            }else if((index - i) === 0)
            {
                adjustedInstructionsArray.push(instructionsArray[index + 1]);
            }else
            {
                adjustedInstructionsArray.push(instructionsArray[i]);
            }
        }

        setInstructionsArray(adjustedInstructionsArray);
    };

    return(
        <div>
            <form>
                <label className="instructionInputLabel">Add an ingredient:&nbsp;</label>
                <select className="instructionPhaseSelection" id="instructionPhaseToAdd" defaultValue="placeholderInstructionPhase">
                    <option disabled hidden value="placeholderInstructionPhase">Select a phase.</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Serving">Serving</option>
                    <option value="Other">Other</option>
                </select>
                <input className="instructionActionInput" type="text" id="instructionActionToAdd" placeholder="describe the action to be taken" />
                <button className="addinstructionButton" onClick={addInstructionsRow} type="button">add instruction</button>
            </form>
            <div>
                <NRInstructionsTable instructionsArrayFromForm={instructionsArray} removeInstructionPassedFunction={removeInstruction}
                                        moveInstructionUpPassedFunction={moveInstructionUp} moveInstructionDownPassedFunction={moveInstructionDown} />
            </div>
        </div>
    )
}

export default InstructionsIntake;