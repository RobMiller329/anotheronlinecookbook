const express = require("express");
const app = new express();
const apiRouter = require("./apiRouter");

/* const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

const __dirname = dirname(fileURLToPath(import.meta.url)); */

app.use(express.json());
app.use('/api', apiRouter);

//uses the global variable __dirname to insert the express middleware using the file location
//app.use(express.static(path.join(__dirname, '../build')));

//the request being sent through express
/* app.get('/', function (req, res)
{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
}); */

app.listen(process.env.PORT || '8080', () =>
{
    console.log(`running on port ${process.env.PORT || '8080'}`);
});
