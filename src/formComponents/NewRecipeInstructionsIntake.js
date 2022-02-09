import React from "react";
import { useState, useEffect } from "react";
import NRInstructionsTable from "./NewRecipeInstructionsTable";

function NRInstructionsIntake(props)
{
    const [instructionObject, setInstructionObject] = useState( { phase: "prep", action: "example" } );
    const [instructionsArray, setInstructionsArray] = useState( [] );

    //calls the function to update the array whenever the instructionObject is updated
    useEffect(() =>
    {
        updateInstructionsArray();
    }, [instructionObject]);

    //calls the passing instructions function when the array is updated
    useEffect(() =>
    {
        passingInstructionsArrayToParent(instructionsArray);
    }, [instructionsArray]);

    //used to pass data from child to parent
    const passingInstructionsArrayToParent = (insArray) =>
    {
        props.setInstructionsArray(insArray);
    }

    //adds newly submitted data to the instruction table
    function addInstructionsRow()
    {
        let newInstructionPhase = document.getElementById("instructionPhaseToAdd");
        let newInstructionAction = document.getElementById("instructionActionToAdd");

        setInstructionObject( { phase: newInstructionPhase.value, action: newInstructionAction.value } );

        newInstructionPhase.value = "";
        newInstructionAction.value = "";
        newInstructionPhase.focus();
    }

    //updates the instruction array state by pushing the new object
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

    //removes an instruction by looping through the array and only re-adding those that don't match the removed instruction
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

export default NRInstructionsIntake;
