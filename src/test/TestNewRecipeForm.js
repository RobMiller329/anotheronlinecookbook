import React from "react";
import { useState } from "react";
import DetailsIntake from "./TestRecipeDetailsIntake";
import IngredientsIntake from "./TestRecipeIngredientsIntake";
import InstructionsIntake from "./TestRecipeInstructionsIntake";
import RecipeSubmitButton from "./TestRecipeSubmitButton";

function RecipeForm(props)
{
    const [nrDetailsObject, setNRDetailsObject] = useState( { recipeName: "", adjRecipeName: "", recipeSource: "", recipeProtein: "", recipeCuisine: "" } );
    const [nrIngredients, setNRIngredients] = useState([]);
    const [nrInstructions, setNRInstructions] = useState([]);

    return(
        <div>
            <DetailsIntake setDetailsObject={setNRDetailsObject} />
            <br/><br/>
            <IngredientsIntake setIngredientsArray={setNRIngredients} />
            <br/><br/>
            <InstructionsIntake setInstructionsArray={setNRInstructions} />
            <br/><br/>
            <RecipeSubmitButton detailsObject={nrDetailsObject} ingredientsArray={nrIngredients} instructionsArray={nrInstructions} />
        </div>
    );
}

export default RecipeForm;