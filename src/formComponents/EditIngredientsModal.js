import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import Axios from "axios";
import "./StyleRecipeForm.css";

//the modal component used in the ingredients edit table (shows up as the edit ingredient button)
export const EditIngredientsModal = (props) =>
{
    const [ingredientName, setIngredientName] = useState(props.ingName);
    const [ingredientQuantity, setIngredientQuantity] = useState(props.ingQty);
    const [ingredientMeasurement, setIngredientMeasurement] = useState(props.ingMsr);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    async function updateIngredientAPI()
    {
        try
        {
            await api.post('/recipeIngredients/update/',
            {
                ingredientName: ingredientName,
                ingredientQuantity: ingredientQuantity,
                ingredientMeasurement: ingredientMeasurement,
                ingredientsDataID: props.ingID
            });
            closeModal();
        }catch(err)
        {
            console.log(err);
        }
    }

    return(
        <div className="editIngredientPopup">
            <button type="button" className="editIngredientOpenButton" onClick={ () => setOpen(o => !o) }>edit</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="editIngredientModal">
                    <div className="editIngModalNameLabel">
                        <label>Ingredient Name:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editIngModalNameInput">
                        <input type="text" value={ingredientName} onChange={ (event) => setIngredientName(event.target.value) } />
                    </div>
                    <br/><br/>
                    <div className="editIngModalQuantityLabel">
                        <label>Ingredient Quantity:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editIngModalQuantityInput">
                        <input type="text" value={ingredientQuantity} onChange={ (event) => setIngredientQuantity(event.target.value) } />
                    </div>
                    <br/>
                    <div className="editIngModalMeasurementLabel">
                        <label>Ingredient Measurement:&nbsp;</label>
                    </div>
                    <br/><br/>
                    <div className="editIngModalMeasurementInput">
                        <input type="text" value={ingredientMeasurement} onChange={ (event) => setIngredientMeasurement(event.target.value) } />
                    </div>
                    <br/><br/>
                    <div className="editIngModalSubmitButton">
                        <button onClick={() => updateIngredientAPI()}>submit edit</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

//the modal component used in the ingredients edit table (shows up as the remove ingredient button)
export const RemoveIngredientsModal = (props) =>
{
    const [ingredientName, setIngredientName] = useState(props.ingName);
    const [ingredientQuantity, setIngredientQuantity] = useState(props.ingQty);
    const [ingredientMeasurement, setIngredientMeasurement] = useState(props.ingMsr);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const api = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    async function removeIngredientAPI()
    {
        try
        {
            await api.delete(`/recipeIngredients/delete/${props.ingID}`);
            closeModal();
        }catch(err)
        {
            console.log(err);
        }
    }

    return(
        <div className="removeIngredientPopup">
            <button type="button" className="removeIngredientOpenButton" onClick={ () => setOpen(o => !o) }>remove</button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="removeIngredientModal">
                    <div>
                        <span>Are you sure you want to remove this ingredient from the recipe? This can not be undone.</span>
                    </div>
                    <br/>
                    <div>
                        <label>Ingredient Name:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{ingredientName}</span>
                    </div>
                    <br/>
                    <div>
                        <label>Ingredient Quantity:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{ingredientQuantity}</span>
                    </div>
                    <br/>
                    <div>
                        <label>Ingredient Measurement:&nbsp;</label>
                    </div>
                    <br/>
                    <div>
                        <span>{ingredientMeasurement}</span>
                    </div>
                    <br/>
                    <div>
                        <button onClick={() => removeIngredientAPI()}>remove ingredient</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}
