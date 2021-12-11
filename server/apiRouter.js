const express = require("express");
const router = express.Router();
const dinnerDB = require('./queries');

//api call for View My Recipes results
router.get('/vmr/:id', async (req, res, next) =>
{
    try
    {
        let results = await dinnerDB.viewMyRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for Browse All Recipes results
router.get('/bar/:id', async (req, res, next) =>
{
    try
    {
        let results = await dinnerDB.viewAllRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for Manage My Recipes results
router.get('/mmr/:id', async (req, res, next) =>
{
    try
    {
        let results = await dinnerDB.manageMyRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;