import React from "react";
import { useState } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import { CreateNoteModal, UpdateNoteModal, DeleteNoteModal } from "./NotesModals";

function BTMNotes(props)
{
    const [noteText, setNoteText] = useState("");
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    function closeCreateModal()
    {
        setCreateModalOpen(false);
    }

    function closeUpdateModal()
    {
        setUpdateModalOpen(false);
    }

    function closeDeleteModal()
    {
        setDeleteModalOpen(false);
    }

    function handleNoteCreation(text)
    {
        async function createNote()
        {
            try
            {
                await api.post('/note/insert/',
                {
                    recipeCommentaryID: (props.notes.email + props.notes.recipe),
                    userDataID: props.notes.email,
                    recipeDataID: props.notes.recipe,
                    commentaryMessage: text
                });
                alert("Your note has been posted!");
            }catch(err)
            {
                console.log(err);
            }
        }
        createNote();

        props.refreshNotes();
    }

    function handleNoteUpdate(text)
    {
        async function updateNote()
        {
            try
            {
                await api.post('/note/update/',
                {
                    recipeCommentaryID: (props.notes.email + props.notes.recipe),
                    commentaryMessage: text
                });
                alert("Your note has been edited!");
            }catch(err)
            {
                console.log(err);
            }
        }
        updateNote();

        props.refreshNotes();
    }

    function handleNoteDeletion()
    {
        let recordID = props.notes.email + props.notes.recipe

        async function deleteNote()
        {
            try
            {
                await api.delete(`/note/delete/${recordID}`);
                alert("Your note has been deleted.");
            }catch(err)
            {
                console.log(err);
            }
        }
        deleteNote();

        props.refreshNotes();
    }

    let finishedNotesBuild;
    let textToDisplay;

    if(props.notes.recipe === props.recipeID)
    {
        textToDisplay = props.notes.text;
        finishedNotesBuild = <div className="filledNotesContainer">
                                <br/>
                                <span className="filledNotesText">{textToDisplay}</span>
                                <br/>
                                <div className="updateNoteModal">
                                    <button type="button" className="updateNoteButton" onClick={ () => setUpdateModalOpen(status => !status) }>Edit Note</button>
                                    <Popup open={ updateModalOpen } closeOnDocumentClick onClose={ closeUpdateModal } className="notePopup">
                                    {
                                        close =>
                                        (
                                            <div className="updateNoteInputContainer">
                                                <input type="text" value={noteText} onChange={ (event) => setNoteText(event.target.value) }/>
                                                <button type="button" onClick={ () => { handleNoteUpdate(noteText); closeUpdateModal(); } }>Submit</button>
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
                                            <button type="button" onClick={ () => { handleNoteDeletion(); closeDeleteModal(); } }>Confirm</button>
                                            <button type="button" onClick={ closeDeleteModal }>Cancel</button>
                                        </div>
                                    </Popup>
                                </div>
                            </div>
    }else
    {
        textToDisplay = "You currently do not have any notes for this recipe. To enter a note, please press the Create a Note button."
        finishedNotesBuild = <div className="emptyNotesContainer">
                                <br/>
                                <span className="emptyNotesText">{textToDisplay}</span>
                                <br/>
                                <div className="createNoteModal">
                                    <button type="button" className="createNoteButton" onClick={ () => setCreateModalOpen(status => !status) }>Create a Note</button>
                                    <Popup open={ createModalOpen } closeOnDocumentClick onClose={ closeCreateModal } className="notePopup">
                                        <div className="createNoteInputContainer">
                                            <input type="text" placeholder="Enter your note here." value={noteText} onChange={ (event) => setNoteText(event.target.value) }/>
                                            <button type="button" onClick={ () => { handleNoteCreation(noteText); closeCreateModal(); } }>Submit</button>
                                            <button type="button" onClick={ closeCreateModal }>Cancel</button>
                                        </div>
                                    </Popup>
                                </div>
                            </div>
    }

    return(
        <div className="btmNotesCompContainer">
            { finishedNotesBuild }
        </div>
    );
}

export default BTMNotes;