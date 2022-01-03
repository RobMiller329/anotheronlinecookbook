const connection = require('./dbCredentials');

/*  Below are the queries that we are using for the api call to the database.  */

let cookbookDB = {};

cookbookDB.viewRecipes = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        connection.query(
            `SELECT recipeName, recipeProtein, recipeCuisine, recipeSource, userDataID ` +
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
            `SELECT recipeName, recipeProtein, recipeCuisine, recipeSource, userDataID ` +
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

module.exports = cookbookDB;