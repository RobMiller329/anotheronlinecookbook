import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { NotesPanelFalse, NotesPanelTrue } from "./NotesModals";

function BTMNotes(props)
{
    const [noteText, setNoteText] = useState("");
    const [postedNote, setPostedNote] = useState("");
    const [hasNotes, setHasNotes] = useState(false);
    
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

    return(
        <div className="btmNotesCompContainer">
            { finishedNotesBuild }
        </div>
    );
}

export default BTMNotes;
