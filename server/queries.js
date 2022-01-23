const connection = require('./dbCredentials');

/*  Below are the queries that we are using for the api call to the database.  */

let cookbookDB = {};

cookbookDB.viewRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeDataID, recipeName, recipeProtein, recipeCuisine, recipeSource, userDataID ` +
            `FROM recipedata WHERE userDataID = ?;`, id, (err, results) =>
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

cookbookDB.viewRecipes = () =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeDataID, recipeName, recipeProtein, recipeCuisine, recipeSource, userDataID ` +
            `FROM recipedata;`, (err, results) =>
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
            `FROM recipedata WHERE userDataID = ?;`, id, (err, results) =>
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

cookbookDB.detailIngredientsRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT ingredientName, ingredientQuantity, ingredientMeasurement ` +
            `FROM ingredientsdata WHERE recipeDataID = ?;`, id, (err, results) =>
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

cookbookDB.detailInstructionsRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT instructionPhase, instructionStep, instructionAction ` +
            `FROM instructiondata WHERE recipeDataID = ?;`, id, (err, results) =>
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

cookbookDB.createNewRecipeTransaction = (transactionID, transactionTime, userDataID, recipeDataID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO transactions (transactionsID, transactionTime, userDataID, transactionType, recipeDataID) ` +
            `VALUES (?, ?, ?, 'create', ?);`, (transactionID, transactionTime, userDataID, recipeDataID), (err, results) =>
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

cookbookDB.createNewRecipeRecipeData = (recipeDataID, recipeSource, recipeProtein, recipeCuisine, userDataID, recipeName) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO recipedata (recipeDataID, recipeSource, recipeProtein, recipeCuisine, userDataID, recipeName) ` +
            `VALUES (?, ?, ?, ?, ?, ?);`, (recipeDataID, recipeSource, recipeProtein, recipeCuisine, userDataID, recipeName), (err, results) =>
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

cookbookDB.createNewRecipeIngredients = (ingredientsDataID, ingredientIterator, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO ingredientsdata (ingredientsDataID, ingredientIterator, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement) ` +
            `VALUES (?, ?, ?, ?, ?, ?);`, (ingredientsDataID, ingredientIterator, ingredientName, recipeDataID, ingredientQuantity, ingredientMeasurement), (err, results) =>
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

cookbookDB.createNewRecipeInstructions = (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO instructiondata (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction) ` +
            `VALUES (?, ?, ?, ?, ?);`, (instructionDataID, recipeDataID, instructionPhase, instructionStep, instructionAction), (err, results) =>
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

module.exports = cookbookDB;