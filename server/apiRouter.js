const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser")
const cookbookDB = require('./queries');

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended: false } ));


//api call for retrieving all recipes
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

//api call for retrieving list of user's recipes
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

//api call for retrieving user's selected recipe ingredients in the edit component
router.get('/recipeIngredients/select/:id', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.retrieveRecipeIngredients(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for retrieving user's selected recipe instructions in the edit component
router.get('/recipeInstructions/select/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.retrieveRecipeInstructions(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for updating selected recipe data
router.post('/recipeData/update/', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.updateRecipeData(req.body.recipeSource, req.body.userDataID, req.body.recipeName, req.body.recipeCuisine, req.body.recipeProtein, req.body.recipeDataID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for updating selected recipe ingredient data
router.post('/recipeIngredients/update/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.updateRecipeIngredients(req.body.ingredientName, req.body.ingredientQuantity, req.body.ingredientMeasurement, req.body.ingredientsDataID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for updating selected recipe instruction data
router.post('/recipeInstructions/update/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.updateRecipeInstructions(req.body.instructionPhase, req.body.instructionStep, req.body.instructionAction, req.body.instructionDataID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for updating username
router.post('/username/update/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.updateUserData(req.body.userName, req.body.userDataID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for creating username
router.post('/username/insert/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.createUserData(req.body.userDataID, req.body.userName);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for creating a recipe data record
router.post('/recipeData/insert/', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.createRecipeData(req.body.recipeDataID, req.body.recipeSource, req.body.userDataID, req.body.recipeName, req.body.recipeCuisine, req.body.recipeProtein);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for creating recipe ingredient data
router.post('/recipeIngredients/insert/', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.createRecipeIngredients(req.body.ingredientsDataID, req.body.ingredientName, req.body.recipeDataID, req.body.ingredientQuantity, req.body.ingredientMeasurement);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    createRecipeAPI, userDataID, dataObjectHolder.adjRecipeName, submitTime, doubleDigits(y), instructionsArray[y].phase,
                                    instructionsArray[y].step, instructionsArray[y].action
*/

//api call for creating recipe instruction data
router.post('/recipeInstructions/insert/', async (req, res) =>
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
});

//api call to delete a recipe data record
router.delete('/recipeData/delete/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.deleteRecipeData(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call to delete recipe ingredient data
router.delete('/recipeIngredients/delete/:id', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.deleteRecipeIngredients(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call to delete recipe instruction data
router.delete('/recipeInstructions/delete/:id', async (req, res) =>
{
    try
    {
        let results = await cookbookDB.deleteRecipeInstructions(req.params.recipeDataID);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;