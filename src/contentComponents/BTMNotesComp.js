import React from "react";
import Axios from "axios";

function BTMNotes(props)
{
    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    function createRecipeNote()
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
                    commentaryMessage: props.notes.text
                });
                alert("Your note has been posted!");
            }catch(err)
            {
                console.log(err);
            }
        }
        createNote();
    }

    function updateRecipeNote()
    {
        async function updateNote()
        {
            try
            {
                await api.post('/note/update/',
                {
                    recipeCommentaryID: (props.notes.email + props.notes.recipe),
                    commentaryMessage: props.notes.text
                });
                alert("Your note has been edited!");
            }catch(err)
            {
                console.log(err);
            }
        }
        updateNote();
    }

    function deleteRecipeNote()
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
    }


/*     notes
    const [notesData, setNotesData] = useState( { text: "", email: "", recipe: "" } ); */

    /*
        NEED TO ADD MODALS FOR CREATING AND EDITING A NOTE
    */

    let finishedNotesBuild;
    let textToDisplay;

    if(props.notes.recipe === props.recipeID)
    {
        textToDisplay = props.notes.text;
        finishedNotesBuild = <div className="filledNotesContainer">
                                <br/>
                                <span className="filledNotesText">{textToDisplay}</span>
                                <br/>
                                <button className="editNotesButton" onClick={ () => updateRecipeNote() }>Edit Your Note</button>
                                <br/>
                                <button className="deleteNotesButton" onClick={ () => deleteRecipeNote() }>Delete Your Note</button>
                            </div>
    }else
    {
        textToDisplay = "You currently do not have any notes for this recipe. To enter a note, please press the Create a Note button."
        finishedNotesBuild = <div className="emptyNotesContainer">
                                <br/>
                                <span className="emptyNotesText">{textToDisplay}</span>
                                <br/>
                                <button className="createNotesButton" onClick={ () => createRecipeNote() }>Create a Note</button>
                            </div>
    }

    return(
        <div className="btmNotesCompContainer">
            { finishedNotesBuild }
        </div>
    );
}

export default BTMNotes;