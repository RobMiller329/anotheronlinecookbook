import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { BrowseTableModal } from "./BrowseTableModal";

function BrowseTableBody(props)
{
    const browseTableRows = props.recipesArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td>{row.recipeName}</td>
                <td>{row.recipeProtein}</td>
                <td>{row.recipeCuisine}</td>
                <td>{row.recipeSource}</td>
                <td>{row.userName}</td>
                <td>
                    <BrowseTableModal recipeID={row.recipeDataID} />
                </td>
            </tr>
        );
    });

    return(
        <tbody>
            { browseTableRows }
        </tbody>
    );
}

function BrowseTableBuild(props)
{
    const [data, setData] = useState([]);

    const viewRecipesAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    useEffect(() =>
    {
        async function fetchData()
        {
            try
            {
                let returnedData = await viewRecipesAPICall.get(`/browse/`).then(( { data } ) => data);
                setData(returnedData);
            }catch(err)
            {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <table>
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Protein</th>
                    <th>Cuisine</th>
                    <th>Source</th>
                    <th>Submitted By</th>
                    <th></th>
                </tr>
            </thead>
            <BrowseTableBody recipesArray={ data } />
        </table>
    );
}

export default BrowseTableBuild;