import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import "./StyleRecipeForm.css";

 function EditRecipesForm(props)
 {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setLoggedIn(true);
            setUserEmail(email);
        });
    });

    function EditRecipeForm()
    {
        return(
            <div>
                <p>edit</p>
            </div>
        );
    }

    function UserNotLoggedIn()
    {
        return(
            <p>Please login to edit or create a recipe.</p>
        );
    }

    return(
        <div>
            <div className="recipeEditPageHeader">
                <h1>Edit My Recipes</h1>
            </div>
            <div className="formRender">
                {loggedIn && <EditRecipeForm />}
                {!loggedIn && <UserNotLoggedIn />}
            </div>
        </div>
    );
}

export default EditRecipesForm;


/* INSERT INTO transactions (transactionsID, transactionDateTime, userDataID, transactionType, recipeDataID) VALUES
(CONCAT('robert.miller.329@gmail.com', CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))), NOW(),
'robert.miller.329@gmail.com', 'create', CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',
CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))));
INSERT INTO recipedata (recipeDataID, recipeSource, recipeProtein, recipeCuisine, userDataID, recipeName) VALUES
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))),
'home recipe','none','Italian', 'robert.miller.329@gmail.com', 'Bagel Pizza');
INSERT INTO ingredientsdata (ingredientsDataID, ingredientIterator, ingredientName, recipeDataID, ingredientQuantity,ingredientMeasurement) VALUES
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'1'),1,'bagels',
CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))),4,'each'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'2'),2,'shredded cheese',
CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))),0.5,'lbs'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'3'),3,'pizza sauce',
CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW()))),2,'tablespoon');
INSERT INTO instructiondata (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction) VALUES
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'prep',1),CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',NOW()),
'prep',1,'cut bagel in half'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'prep',2),CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',NOW()),
'prep',2,'lightly toast bagel halves'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'prep',3),CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',NOW()),
'prep',3,'place a very thin layer of sauce on each half'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'prep',4),CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',NOW()),
'prep',4,'cover generously with shredded cheese'),
(CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',CONCAT(DAY(NOW()),MONTH(NOW()),YEAR(NOW()),HOUR(NOW()),MINUTE(NOW())),'cook',1),CONCAT('robert.miller.329@gmail.com','Bagel_Pizza',NOW()),
'cook',1,'bake in a toaster oven at 375 until cheese is completely melted'); */