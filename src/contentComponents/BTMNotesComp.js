import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import { NotesPanelFalse, NotesPanelTrue } from "./NotesModals";

function BTMNotes(props)
{
    const [noteText, setNoteText] = useState("");
    const [postedNote, setPostedNote] = useState("");
    const [hasNotes, setHasNotes] = useState(false);
/*     const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); */
    
    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    useEffect(() =>
    {
        setPostedNote(props.text);
        noteMessageSelector();
    }, [props])

/*     function closeCreateModal()
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
    } */

    /* function setupNoteUpdate()
    {
        setNoteText(postedNote);
        setUpdateModalOpen(status => !status);
    } */

    function handleNoteCreation(text)
    {
        async function createNote()
        {
            try
            {
                await api.post('/note/insert/',
                {
                    recipeCommentaryID: (props.userID + props.recipeID),
                    userDataID: props.userID,
                    recipeDataID: props.recipeID,
                    commentaryMessage: text
                });
                setPostedNote(noteText);
                alert("Your note has been posted!");
            }catch(err)
            {
                console.log(err);
            }
        }
        createNote();

        setHasNotes(true);
    }

    function handleNoteUpdate(text)
    {
        async function updateNote()
        {
            try
            {
                await api.post('/note/update/',
                {
                    recipeCommentaryID: (props.userID + props.recipeID),
                    commentaryMessage: text
                });
                setPostedNote(noteText);
                alert("Your note has been edited!");
                setNoteText("");
            }catch(err)
            {
                console.log(err);
            }
        }
        updateNote();
    }

    function handleNoteDeletion()
    {
        let recordID = props.userID + props.recipeID

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

        setPostedNote("");
        setHasNotes(false);
    }

    function noteMessageSelector()
    {
        if(typeof props.text !== undefined && props.text !== "")
        {
            setHasNotes(true);
        }
    }

    let finishedNotesBuild;

    if(hasNotes)
    {
        finishedNotesBuild = <NotesPanelTrue passedText={ postedNote } deleting={ handleNoteDeletion } updating={ handleNoteUpdate } />
    }else
    {
        finishedNotesBuild = <NotesPanelFalse creating={ handleNoteCreation } />
    }

    /* let finishedNotesBuild;

    if(typeof props.text !== undefined && props.text !== "")
    {
        finishedNotesBuild = <div className="filledNotesContainer">
                                <br/>
                                <span className="filledNotesText">{ postedNote }</span>
                                <br/>
                                <div className="updateNoteModal">
                                    <button type="button" className="updateNoteButton" onClick={ () => setupNoteUpdate() }>Edit Note</button>
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
        let textToDisplay = "You currently do not have any notes for this recipe. To enter a note, please press the Create a Note button."
        finishedNotesBuild = <div className="emptyNotesContainer">
                                <br/>
                                <span className="emptyNotesText">{ textToDisplay }</span>
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
    ); */

    return(
        <div className="btmNotesCompContainer">
            { finishedNotesBuild }
        </div>
    );
}

export default BTMNotes;
