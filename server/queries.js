const connection = require('./dbCredentials');

/*  Below are the queries that we are using for the api call to the database.  */

let cookbookDB = {};

cookbookDB.username = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT userName ` +
            `FROM userdata ` +
            `WHERE userDataID = ?;`, [id], (err, results) =>
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

cookbookDB.browseRecipes = () =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName, a.userDataID ` +
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

cookbookDB.filteredBrowse = (name, protein, cuisine, source, user) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName ` +
            `FROM recipedata as a ` + 
            `JOIN userdata as b ON a.userDataID = b.userDataID ` +
            `WHERE a.recipeName LIKE ? AND a.recipeProtein LIKE ? AND a.recipeCuisine LIKE ? ` +
            `AND a.recipeSource LIKE ? AND b.userName LIKE ?;`, [name, protein, cuisine, source, user], (err, res) =>
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

cookbookDB.viewRecipe = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeSource, b.userName, a.userDataID ` +
            `FROM recipedata AS a ` + 
            `JOIN userdata AS b ON a.userDataID = b.userDataID ` +
            `WHERE a.recipeDataID = ?;`, [id], (err, results) =>
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
            `WHERE recipeDataID = ?;`, [recipeSource, userDataID, recipeName, recipeCuisine, recipeProtein, recipeDataID], (err, res) =>
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
            `DELETE FROM ingredientsdata WHERE ingredientsDataID = ?;`, [id], (err, res) =>
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
            `DELETE FROM instructiondata WHERE instructionDataID = ?;`, [id], (err, res) =>
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

cookbookDB.deleteRecipeIngredientsTotal = (id) =>
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

cookbookDB.deleteRecipeInstructionsTotal = (id) =>
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

cookbookDB.createFavoriteRecipe = (favoritesDataID, favoritesDataType, userDataID, favoritesDataItemID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO favoritesdata (favoritesDataID, favoritesDataType, userDataID, favoritesDataItemID) ` +
            `VALUES (?, ?, ?, ?);`, [favoritesDataID, favoritesDataType, userDataID, favoritesDataItemID], (err, res) =>
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

cookbookDB.deleteFavoriteRecipe = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `DELETE FROM favoritesdata WHERE favoritesDataID = ?;`, [id], (err, res) =>
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

cookbookDB.retrieveFavoriteRecipe = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT favoritesDataID, favoritesDataType, userDataID, favoritesDataItemID ` +
            `FROM favoritesdata WHERE favoritesDataID = ? `, [id], (err, results) =>
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

/* cookbookDB.retrieveRecipeNotes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeCommentaryID, userDataID, recipeDataID, commentaryMessage ` +
            `FROM recipecommentary WHERE recipeCommentaryID = ? `, [id], (err, results) =>
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
}; */

cookbookDB.retrieveRecipeNotes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT commentaryMessage ` +
            `FROM recipecommentary WHERE recipeCommentaryID = ? `, [id], (err, results) =>
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

cookbookDB.updateRecipeNote = (commentaryMessage, recipeCommentaryID) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `UPDATE recipecommentary SET commentaryMessage = ? ` +
            `WHERE recipeCommentaryID = ?;`, [commentaryMessage, recipeCommentaryID], (err, res) =>
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

cookbookDB.createRecipeNote = (recipeCommentaryID, userDataID, recipeDataID, commentaryMessage) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `INSERT INTO recipecommentary (recipeCommentaryID, userDataID, recipeDataID, commentaryMessage) ` +
            `VALUES (?, ?, ?, ?);`, [recipeCommentaryID, userDataID, recipeDataID, commentaryMessage], (err, res) =>
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


//let results = await cookbookDB.(req.params.id);
cookbookDB.deleteRecipeNote = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `DELETE FROM recipecommentary WHERE recipeCommentaryID = ?;`, [id], (err, res) =>
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

cookbookDB.myRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName, a.userDataID ` +
            `FROM recipedata as a ` + 
            `JOIN userdata as b ON a.userDataID = b.userDataID ` +
            `WHERE a.userDataID = ?`, [id], (err, results) =>
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

//let results = await cookbookDB.favoriteRecipes(req.params.id);
cookbookDB.favoriteRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName, a.userDataID ` +
            `FROM recipedata as a ` + 
            `JOIN userdata as b ON a.userDataID = b.userDataID ` +
            `WHERE a.recipeDataID IN (SELECT favoritesDataItemID FROM favoritesdata WHERE favoritesDataType = 'recipe' AND userDataID = ?)`, [id], (err, results) =>
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

//let results = await cookbookDB.followedCreators(req.params.id);
cookbookDB.followedCreators = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeDataID, a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.userName, a.userDataID ` +
            `FROM recipedata as a ` + 
            `JOIN userdata as b ON a.userDataID = b.userDataID ` +
            `WHERE a.userDataID IN (SELECT favoritesDataItemID FROM favoritesdata WHERE favoritesDataType = 'creator' AND userDataID = ?)`, [id], (err, results) =>
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
