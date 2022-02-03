const connection = require('./dbCredentials');

/*  Below are the queries that we are using for the api call to the database.  */

let cookbookDB = {};

cookbookDB.browseRecipes = () =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName ` +
            `FROM recipedata as a ` + 
            `JOIN userdata as b ON a.userDataID = b.userDataID;`, (err, results) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(results);
            }
        });
    });
};

cookbookDB.listRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeName, recipeProtein, recipeCuisine, recipeSource, recipeDataID ` +
            `FROM recipedata WHERE userDataID = ?;`, [id], (err, results) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(results);
            }
        });
    });
};

cookbookDB.retrieveRecipeIngredients = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT ingredientsDataID, ingredientName, ingredientQuantity, ingredientMeasurement ` +
            `FROM ingredientsdata WHERE recipeDataID = ? ` +
            `ORDER BY ingredientsDataID;`, [id], (err, results) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(results);
            }
        });
    });
};

cookbookDB.retrieveRecipeInstructions = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT instructionDataID, instructionPhase, instructionStep, instructionAction ` +
            `FROM instructiondata WHERE recipeDataID = ? ` +
            `ORDER BY instructionStep;`, [id], (err, results) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(results);
            }
        });
    });
};

cookbookDB.updateRecipeData = (recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein, recipeDataID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE recipedata SET recipeSource = ?, userDataID = ?, recipeName = ?, recipeCuisine = ?, recipeProtein = ? ` +
            `FROM recipedata WHERE recipeDataID = ?;`, [recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein, recipeDataID], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.updateRecipeIngredients = (ingredientName, ingredientQuantity, ingredientMeasurement, ingredientsDataID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE ingredientsdata SET ingredientName = ?, ingredientQuantity = ?, ingredientMeasurement = ? ` +
            `WHERE ingredientsDataID = ?;`, [ingredientName, ingredientQuantity, ingredientMeasurement, ingredientsDataID], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.updateRecipeInstructions = (instructionPhase, instructionStep, instructionAction, instructionDataID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE instructiondata SET instructionPhase = ?, instructionStep = ?, instructionAction = ? ` +
            `WHERE instructionDataID = ?;`, [instructionPhase, instructionStep, instructionAction, instructionDataID], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.updateUserData = (userName, userDataID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE userdata SET userName = ? WHERE userDataID = ?;`, [userName, userDataID], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.createUserData = (userDataID, userName) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO userdata (userDataID, userName) VALUES (?, ?);`, [userDataID, userName], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.createRecipeData = (recipeDataID, recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO recipedata (recipeDataID, recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein) ` +
            `VALUES (?, ?, ?, ?, ?, ?);`, [recipeDataID, recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.createRecipeIngredients = (ingredientsDataID, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO ingredientsdata (ingredientsDataID, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement) ` +
            `VALUES (?, ?, ?, ?, ?);`, [ingredientsDataID, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

/*
    createRecipeAPI, userDataID, dataObjectHolder.adjRecipeName, submitTime, doubleDigits(y), instructionsArray[y].phase,
                                    instructionsArray[y].step, instructionsArray[y].action
*/

//api call for creating recipe instruction data
/* router.post('/recipeInstructions/insert/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.createRecipeInstructions(req.body.instructionDataID, req.body.recipeDataID, req.body.instructionPhase, req.body.instructionStep, req.body.instructionAction);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
}); */

cookbookDB.createRecipeInstructions = (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO instructiondata (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction) ` +
            `VALUES (?, ?, ?, ?, ?);`, [instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.deleteRecipeData = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `DELETE FROM recipedata WHERE recipeDataID = ?;`, [id], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.deleteRecipeIngredients = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `DELETE FROM ingredientsdata WHERE recipeDataID = ?;`, [id], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

cookbookDB.deleteRecipeInstructions = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `DELETE FROM instructiondata WHERE recipeDataID = ?;`, [id], (err, res) =>
        {
            if(err)
            {
                return reject(err);
            }else
            {
                return resolve(res);
            }
        });
    });
};

module.exports = cookbookDB;