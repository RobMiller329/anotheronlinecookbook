const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookbookDB = require('./queries');

router.use(cors());

//api call for View My Recipes results
router.get('/vmr/:id', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.viewMyRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

//api call for Browse All Recipes results
router.get('/bar', async (req, res, next) =>
{
    try
    {
        let results = await cookbookDB.viewAllRecipes(req.params.id);
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
        let results = await cookbookDB.manageMyRecipes(req.params.id);
        res.json(results);
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;