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
    const [data, setData] = useState([]);
    
    let userID = props.userID;
    let columnsToPass;
    let tablePage = props.tablePage;

    const viewMyRecipesAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    const getViewMyRecipes = async (passedID) =>
    {
        try
        {
            let returnedData = await viewMyRecipesAPICall.get(`vmr/${passedID}`).then(( { data } ) => data);
            setData(returnedData);
        }catch(err)
        {
            console.log(err);
        }
    }

    switch(tablePage)
    {
        case "ViewMyRecipes":
            getViewMyRecipes(userID);
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