const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser")
const cookbookDB = require('./queries');

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended: false } ));

/*
    10) update ingredient data              /ingredientsdata/update/
    11) update instruction data             /instructionsdata/update/    
    13) update user data                    /userdata/update/

    14) delete recipe details               /recipedata/delete/
    15) delete recipe ingredients           /ingredientsdata/delete/
    16) delete recipe instructions          /instructionsdata/delete/

    06) insert recipe data                  /recipedata/insert/
    07) insert ingredient data              /ingredientsdata/insert/
    08) insert instructions data            /instructionsdata/insert/
    12) insert user data                    /userdata/insert/
    
*/

//api call for fetching all recipes
router.get('/browse/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.browseRecipes();
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for fetching list of user's recipes
router.get('/recipeList/:id', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.listRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for fetching user's selected recipe ingredients in the edit component
router.get('/recipeIngredients/select/:id', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.fetchRecipeIngredients(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for fetching user's selected recipe instructions in the edit component
router.get('/recipeInstructions/select/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.fetchRecipeInstructions(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for updating selected recipe data
router.get('/recipedata/update/', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.updateRecipeData(req.body.source, req.body.userID, req.body.rName, req.body.rCuisine, req.body.rProtein, req.body.recID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});













//
router.post('/username/', async (req, res) =>
{
    try
    {
        let apiCall = await cookbookDB.createUsername(req.body.email, req.body.username);
        console.log(req.body.email, req.body.username);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//
router.post('/createRecipe/transactions/', async (req, res, next) =>
{
    console.log("req:"+req.body);
    console.log("res"+res);
    /* try
    {
        let results = await cookbookDB.createNewRecipeTransaction(req.params.tranString);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    } */
});

//
router.post('/createRecipe/recipedata/', async (req, res, next) =>
{
    console.log("req:"+req.body);
    console.log("res"+res);
    /* try
    {
        let results = await cookbookDB.createNewRecipeTransaction(req.params.tranString);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    } */
});

module.exports = router;