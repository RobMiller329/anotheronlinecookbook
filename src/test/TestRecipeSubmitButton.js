import React from "react";

function RecipeSubmitButton(props)
{
    function logDetails()
    {
        //detailsObject={nrDetailsObject} ingredientsArray={nrIngredients} instructionsArray={nrInstructions}
        console.log(props.detailsObject);
        console.log(props.ingredientsArray);
        console.log(props.instructionsArray);
    }

    return(
        <div>
            <button type="button" onClick={logDetails}>Submit</button>
        </div>
    )
}

export default RecipeSubmitButton;