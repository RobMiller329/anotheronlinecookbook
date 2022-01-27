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

cookbookDB.fetchRecipeIngredients = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT ingredientsDataID, ingredientName, ingredientQuantity, ingredientMeasurement ` +
            `FROM ingredientsdata WHERE recipeDataID = ? ` +
            `ORDER BY ingredientsDataID;`, id, (err, results) =>
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

cookbookDB.fetchRecipeInstructions = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT instructionDataID, instructionPhase, instructionStep, instructionAction ` +
            `FROM instructiondata WHERE recipeDataID = ? ` +
            `ORDER BY instructionStep;`, id, (err, results) =>
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

cookbookDB.updateRecipeData = (source, userID, rName, rCuisine, rProtein, recID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE recipedata SET recipeSource = ?, userDataID = ?, recipeName = ?, recipeCuisine = ?, recipeProtein = ? ` +
            `FROM recipedata WHERE recipeDataID = ?;`, (source, userID, rName, rCuisine, rProtein, recID), (err, res) =>
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











/* cookbookDB.createUsername = (email, username) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO userdata (userDataID, userName) ` +
            `VALUES (?, ?);`, (email, username), (err, results) =>
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
} */

cookbookDB.createNewRecipeTransaction = (transactionString) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO transactions (transactionsID, transactionTime, userDataID, transactionType, recipeDataID) ` +
            `VALUES ?;`, (transactionString), (err, results) =>
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