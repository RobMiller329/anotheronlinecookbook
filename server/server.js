/* import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import apiRouter from "./apiRouter"; */

const express = require("express");
const path = require("path");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

const apiRouter = require("./apiRouter");

const app = new express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

//designates endpoint for router to use
app.use('/api', apiRouter);

//uses the global variable __dirname to insert the express middleware using the file location
app.use(express.static(path.join(__dirname, '../build')));

//the request being sent through express
app.get('/', function (req, res)
{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(8080);
//app.listen(3000);