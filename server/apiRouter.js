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

module.exports = router;