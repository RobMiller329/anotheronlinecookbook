import React from "react";
import { useState } from "react";
import Axios from "axios";
import { viewMyRecipesColumns } from "./columnsViewMyRecipes";
import { browseAllRecipesColumns } from "./columnsBrowseAllRecipes";
import { manageMyRecipesColumns } from "./columnsManageMyRecipes";
import ListRecipesTableBuild from "./tableConstruction";
import "./StyleTables.css";

function ListRecipesTable(props)
{
    /* let dataVMR = [ 
        {"recipeName": "A Good Recipe", "Protein": "Beef", "Cuisine": "American", "Source": "Family Recipe"},
        {"recipeName": "A Different Recipe", "Protein": "Chicken", "Cuisine": "Chines", "Source": "www.Food.com"},
        {"recipeName": "3 Recipe", "Protein": "Beef", "Cuisine": "French", "Source": "Family Recipe"},
        {"recipeName": "4 Recipe", "Protein": "Turkey", "Cuisine": "Indian", "Source": "Family Recipe"},
        {"recipeName": "5 Recipe", "Protein": "Chicken", "Cuisine": "Italian", "Source": "Family Recipe"},
        {"recipeName": "6 Recipe", "Protein": "Pork", "Cuisine": "Mexican", "Source": "Family Recipe"},
        {"recipeName": "7 Recipe", "Protein": "Vegetarian", "Cuisine": "Spanish", "Source": "Family Recipe"},
        {"recipeName": "8 Recipe", "Protein": "Beef", "Cuisine": "American", "Source": "Family Recipe"},
        {"recipeName": "9 Recipe", "Protein": "Vegetarian", "Cuisine": "Chinese", "Source": "Family Recipe"},
        {"recipeName": "10 Recipe", "Protein": "Chicken", "Cuisine": "French", "Source": "Family Recipe"},
        {"recipeName": "11 Recipe", "Protein": "Turkey", "Cuisine": "Indian", "Source": "Family Recipe"},
        {"recipeName": "12 Recipe", "Protein": "Pork", "Cuisine": "Italian", "Source": "Family Recipe"},
        {"recipeName": "13 Recipe", "Protein": "Beef", "Cuisine": "Mexican", "Source": "Family Recipe"},
        {"recipeName": "14 Recipe", "Protein": "Chicken", "Cuisine": "Spanish", "Source": "Family Recipe"},
        {"recipeName": "15 Recipe", "Protein": "Pork", "Cuisine": "American", "Source": "Family Recipe"},
        {"recipeName": "16 Recipe", "Protein": "Turkey", "Cuisine": "Spanish", "Source": "Family Recipe"},
        {"recipeName": "17 Recipe", "Protein": "Vegetarian", "Cuisine": "Mexican", "Source": "Family Recipe"},
        {"recipeName": "18 Recipe", "Protein": "Other", "Cuisine": "Indian", "Source": "Family Recipe"},
    ];

    let dataBAR = [ {"recipeName": "A Great Recipe", "Protein": "Beef", "Cuisine": "American", "Source": "Family Recipe"}, 
    {"recipeName": "A Different Recipe", "Protein": "Chicken", "Cuisine": "Italian", "Source": "www.Food.com"} ];

    let dataMMR = [ {"recipeName": "A Wonderful Recipe", "Protein": "Beef", "Cuisine": "American", "Source": "Family Recipe", "lastEdit": "Friday", "editButton": "X", "deleteButton": "X"}, 
    {"recipeName": "A Different Recipe", "Protein": "Chicken", "Cuisine": "Italian", "Source": "www.Food.com", "lastEdit": "Friday", "editButton": "X", "deleteButton": "X"} ]; */

    const [data, setData] = useState([]);
    
    let userID = props.userID;
    let columnsToPass;
    let tablePage = props.tablePage;

    const browseMyRecipesAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    const getBrowseMyRecipes = async (passedID) =>
    {
        try
        {
            let returnedData = await browseMyRecipesAPICall.get(`bmr/${passedID}`).then( results => results);
            setData(returnedData);
        }catch(err)
        {
            console.log(err);
        }
    }

    switch(tablePage)
    {
        case "ViewMyRecipes":
            getBrowseMyRecipes(userID);
            columnsToPass = <ListRecipesTableBuild columns={viewMyRecipesColumns} data={data} />
            break;
        case "BrowseAllRecipes":
            columnsToPass = <ListRecipesTableBuild columns={browseAllRecipesColumns} data={data} />
            break;
        case "ManageMyRecipes":
            columnsToPass = <ListRecipesTableBuild columns={manageMyRecipesColumns} data={data} />
            break;
        default:
            //
            break;
    }
        
    return (
        <div>
            {columnsToPass}
        </div>
    );
}

export default ListRecipesTable;