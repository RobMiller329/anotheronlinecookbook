import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import Axios from "axios";
import "./StyleRecipeForm.css";

//the modal that contains the ui to edit an instruction (shows up as the edit instruction button)
export const EditInstructionsModal = (props) =>
{
    const [instructionPhase, setInstructionPhase] = useState(props.insPhase);
    const [instructionStep, setInstructionStep] = useState(props.insStep);
    const [instructionAction, setInstructionAction] = useState(props.insAct);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        //baseURL: `http://localhost:8080/api/`
        baseURL: `https://anotheronlinecookbook.herokuapp.com/api/`
    });

    async function updateInstructionAPI()
    {
        try
        {
            await api.post('/recipeInstructions/update/',
            {
                instructionPhase: instructionPhase,
                instructionStep: instructionStep,
                instructionAction: instructionAction,
                instructionDataID: props.insID
            });
            closeModal();
        }catch(err)
        {
            console.log(err);
        }
    }

    return(
        <div className="editInstructionPopup">
            <button type="button" className="editInstructionOpenButton" onClick={ () => setOpen(o => !o) }>edit</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="editInstructionModal">
                    <div className="editInsModalPhaseLabel">
                        <label>Instruction Phase:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editInsModalPhaseInput">
                        <input type="text" value={instructionPhase} onChange={ (event) => setInstructionPhase(event.target.value) } />
                    </div>
                    <br/><br/>
                    <div className="editInsModalStepLabel">
                        <label>Instruction Step:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editInsModalStepInput">
                        <input type="text" value={instructionStep} onChange={ (event) => setInstructionStep(event.target.value) } />
                    </div>
                    <br/>
                    <div className="editInsModalActionLabel">
                        <label>Instruction Action:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editInsModalActionInput">
                        <input type="text" value={instructionAction} onChange={ (event) => setInstructionAction(event.target.value) } />
                    </div>
                    <br/><br/>
                    <div className="editInsModalSubmitButton">
                        <button onClick={() => updateInstructionAPI()}>submit edit</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

//the modal that contains the ui to remove an instruction (shows up as the remove instruction button)
export const RemoveInstructionsModal = (props) =>
{
    const [instructionPhase, setInstructionPhase] = useState(props.insPhase);
    const [instructionStep, setInstructionStep] = useState(props.insStep);
    const [instructionAction, setInstructionAction] = useState(props.insAct);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        //baseURL: `http://localhost:8080/api/`
        baseURL: `https://anotheronlinecookbook.herokuapp.com/api/`
    });

    async function removeInstructionAPI()
    {
        try
        {
            await api.delete(`/recipeInstructions/delete/${props.insID}`);
            closeModal();
        }catch(err)
        {
            console.log(err);
        }
    }

    return(
        <div className="removeInstructionPopup">
            <button type="button" className="removeInstructionOpenButton" onClick={ () => setOpen(o => !o) }>remove</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="removeInstructionModal">
                    <div>
                        <span>Are you sure you want to remove this instruction from the recipe? This can not be undone.</span>
                    </div>
                    <br/>
                    <div>
                        <label>Instruction Phase:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{instructionPhase}</span>
                    </div>
                    <br/>
                    <div>
                        <label>Instruction Step:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{instructionStep}</span>
                    </div>
                    <br/>
                    <div>
                        <label>Instruction Action:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{instructionAction}</span>
                    </div>
                    <br/>
                    <div>
                        <button onClick={() => removeInstructionAPI()}>remove ingredient</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}
