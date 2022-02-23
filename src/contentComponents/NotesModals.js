import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import './StyleBrowseModal.css';

export const NotesPanelTrue = (props) =>
{
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [trueNoteText, setTrueNoteText] = useState("");

    function closeUpdateModal()
    {
        setUpdateModalOpen(false);
    }

    function closeDeleteModal()
    {
        setDeleteModalOpen(false);
    }

    function setupNoteUpdate()
    {
        setTrueNoteText(props.passedText);
        setUpdateModalOpen(status => !status);
    }

    return(
        <div className="filledNotesContainer">
            <br/>
            <span className="filledNotesText">{ props.passedText }</span>
            <br/>
            <div className="updateNoteModal">
                <button type="button" className="updateNoteButton" onClick={ () => setupNoteUpdate() }>Edit Note</button>
                <Popup open={ updateModalOpen } closeOnDocumentClick onClose={ closeUpdateModal } className="notePopup">
                {
                    close =>
                    (
                        <div className="updateNoteInputContainer">
                            <input type="text" value={ trueNoteText } onChange={ (event) => setTrueNoteText(event.target.value) }/>
                            <button type="button" onClick={ () => { props.updating(trueNoteText); closeUpdateModal(); } }>Submit</button>
                            <button type="button" onClick={ closeUpdateModal }>Cancel</button>
                        </div>
                    )
                }
                </Popup>
            </div>
            <br/>
            <div className="deleteNoteModal">
                <button type="button" className="deleteNoteButton" onClick={ () => setDeleteModalOpen(status => !status) }>Delete Note</button>
                <Popup open={ deleteModalOpen } closeOnDocumentClick onClose={ closeDeleteModal } className="notePopup">
                    <div className="deleteNoteInputContainer">
                        <span>Clicking confirm will delete your note from this recipe. This process can not be undone. Do you wish to continue?</span>
                        <button type="button" onClick={ () => { props.deleting(); closeDeleteModal(); } }>Confirm</button>
                        <button type="button" onClick={ closeDeleteModal }>Cancel</button>
                    </div>
                </Popup>
            </div>
        </div>
    );
}

export const NotesPanelFalse = (props) =>
{
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [falseNoteText, setFalseNoteText] = useState("");

    function closeCreateModal()
    {
        setCreateModalOpen(false);
    }

    return(
        <div className="emptyNotesContainer">
            <br/>
            <span className="emptyNotesText">You currently do not have any notes for this recipe. To enter a note, please press the Create a Note button.</span>
            <br/>
            <div className="createNoteModal">
                <button type="button" className="createNoteButton" onClick={ () => setCreateModalOpen(status => !status) }>Create a Note</button>
                <Popup open={ createModalOpen } closeOnDocumentClick onClose={ closeCreateModal } className="notePopup">
                    <div className="createNoteInputContainer">
                        <input type="text" placeholder="Enter your note here." value={falseNoteText} onChange={ (event) => setFalseNoteText(event.target.value) }/>
                        <button type="button" onClick={ () => { props.creating(falseNoteText); closeCreateModal(); } }>Submit</button>
                        <button type="button" onClick={ closeCreateModal }>Cancel</button>
                    </div>
                </Popup>
            </div>
        </div>
    );
}
