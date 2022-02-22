import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import './StyleBrowseModal.css';

export const CreateNoteModal = (props) =>
{
    const [noteText, setNoteText] = useState("");

    return(
        <div className="createNoteModal">
            <Popup trigger={<button type="button" className="createNoteButton">Create Note</button>} position="left center">
            {
                close =>
                (
                    <div className="createNoteInputContainer">
                        <input type="text" placeholder="Enter your note here." value={noteText} onChange={ (event) => setNoteText(event.target.value) }/>
                        <button type="button" onClick={ () => { props.createFunction(noteText); close(); } }>Submit</button>
                        <button type="button" onClick={ close }>Cancel</button>
                    </div>
                )
            }
            </Popup>
        </div>
    );
}

export const UpdateNoteModal = (props) =>
{
    const [noteText, setNoteText] = useState("");

    return(
        <div className="updateNoteModal">
            <Popup trigger={ <button type="button" className="updateNoteButton">Edit Note</button> } position="left center">
            {
                close =>
                (
                    <div className="updateNoteInputContainer">
                        <input type="text" value={noteText} onChange={ (event) => setNoteText(event.target.value) }/>
                        <button type="button" onClick={ () => { props.updateFunction(noteText); close(); } }>Submit</button>
                        <button type="button" onClick={ close }>Cancel</button>
                    </div>
                )
            }
            </Popup>
        </div>
    );
}

export const DeleteNoteModal = (props) =>
{
    return(
        <div className="deleteNoteModal">
            <Popup trigger={<button type="button" className="deleteNoteButton">Delete Note</button>} position="left center">
            {
                close =>
                (
                    <div className="deleteNoteInputContainer">
                        <span>Clicking confirm will delete your note from this recipe. This process can not be undone. Do you wish to continue?</span>
                        <button type="button" onClick={ () => { props.deleteFunction(); close(); } }>Confirm</button>
                        <button type="button" onClick={ close }>Cancel</button>
                    </div>
                )
            }
            </Popup>
        </div>
    );
}
