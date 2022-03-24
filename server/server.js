const express = require("express");
const app = new express();
const apiRouter = require("./apiRouter");

app.use(express.json());
app.use('/api', apiRouter);

app.listen(process.env.PORT || '8080', () =>
{
    console.log(`running on port ${process.env.PORT || '8080'}`);
});
