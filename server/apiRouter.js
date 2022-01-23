const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookbookDB = require('./queries');

router.use(cors());

//api call for viewing user's recipes
router.get('/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.viewRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for viewing all recipes
router.get('/', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.viewRecipes();
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for viewing list of user's recipes
router.get('/recipeList/:id', async (req, res, next) =>
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

//api call for viewing user's selected recipe details
router.get('/recipeIngredients/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.detailIngredientsRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for viewing user's selected recipe details
router.get('/recipeInstructions/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.detailInstructionsRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for creating transaction record of user's new recipe
router.get('/recipeInstructions/:transactionID, transactionTime, userDataID, recipeDataID', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.detailInstructionsRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;