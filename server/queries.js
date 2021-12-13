const connection = require('./dbCredentials');

/*  Below are the queries that we are using for the api call to the database.  */

let cookbookDB = {};

cookbookDB.viewMyRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeName, recipeProtein, recipeCuisine, recipeSource ` +
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

cookbookDB.browseAllRecipes = () =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeName, recipeProtein, recipeCuisine, recipeSource` +
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

cookbookDB.manageMyRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT a.recipeName, a.recipeProtein, a.recipeCuisine, a.recipeSource, b.transactionDateTime` +
            `FROM recipedata AS a` +
            `LEFT JOIN transactions AS b ON b.recipeDataID = a.recipeDataID` +
            `WHERE userDataID = ?;`, id, (err, results) =>
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