import React from "react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../loginComponents/Account";
import Axios from "axios";
import { BrowseTableModal } from "./BrowseTableModal";
import "./StyleTables.css";

function BrowseTableBody(props)
{
    const browseTableRows = props.recipesArray.map((row, index) =>
    {
        return(
            <tr key={index}>
                <td className="browseRowName">{row.recipeName}</td>
                <td>{row.recipeProtein}</td>
                <td>{row.recipeCuisine}</td>
                <td>{row.recipeSource}</td>
                <td>{row.userName}</td>
                <td>
                    <BrowseTableModal recipeID={row.recipeDataID} userEmail={props.userEmail} creatorID={row.userDataID} />
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
    const { getSession } = useContext(AccountContext);
    const [data, setData] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const apiCall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    //pulls all recipe and user data on component mount
    useEffect(() =>
    {
        getSession().then(( { email } ) =>
        {
            setUserEmail(email);
        });

        async function fetchData()
        {
            try
            {
                let returnedData = await apiCall.get('/browse/').then(( { data } ) => data);
                setData(returnedData);
            }catch(err)
            {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    function applyBrowseFilter()
    {
        let recipeNameFilterInput = document.getElementById("recipeNameFilterInput").value;
        let recipeProteinFilterInput = document.getElementById("recipeProteinFilterInput").value;
        let recipeCuisineFilterInput = document.getElementById("recipeCuisineFilterInput").value;
        let recipeSourceFilterInput = document.getElementById("recipeSourceFilterInput").value;
        let recipeAuthorFilterInput = document.getElementById("recipeAuthorFilterInput").value;

        let urlString = "";

        if(recipeNameFilterInput !== "")
        {
            urlString += "name:" + recipeNameFilterInput + "&";
        }

        if(recipeProteinFilterInput !== "defaultProteinFilter")
        {
            urlString += "protein:" + recipeProteinFilterInput + "&";
        }

        if(recipeCuisineFilterInput !== "defaultCuisineFilter")
        {
            urlString += "cuisine:" + recipeCuisineFilterInput + "&";
        }

        if(recipeSourceFilterInput !== "")
        {
            urlString += "source:" + recipeSourceFilterInput + "&";
        }

        if(recipeAuthorFilterInput !== "")
        {
            urlString += "author:" + recipeAuthorFilterInput + "&";
        }

        async function fetchFilteredData(filter)
        {
            try
            {
                let returnedData = await apiCall.get(`/filter/${filter}`,
                {
                    recipeNameFilter: filter
                }).then(( { data } ) => data);
                setData(returnedData);
                console.log(returnedData);
            }catch(err)
            {
                console.log(err);
            }
        }
        fetchFilteredData(urlString);
    }

    return(
        <div>
            <div>
                <input type="text" id="recipeNameFilterInput" placeholder="recipe name filter" />
                <select id="recipeProteinFilterInput" defaultValue="defaultProteinFilter">
                    <option value="defaultProteinFilter">protein filter</option>
                    <option value="Beef">Beef</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Fish">Fish</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Other">Other</option>
                    <option value="None">None</option>
                </select>
                <select id="recipeCuisineFilterInput" defaultValue="defaultCuisineFilter">
                    <option value="defaultCuisineFilter">Select a cuisine.</option>
                    <option value="American">American</option>
                    <option value="Cajun">Cajun</option>
                    <option value="Chinese">Chinese</option>
                    <option value="French">French</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Soul">Soul</option>
                    <option value="Thai">Thai</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" id="recipeSourceFilterInput" placeholder="recipe source filter" />
                <input type="text" id="recipeAuthorFilterInput" placeholder="author filter" />
                <button type="button" onClick={() => applyBrowseFilter()}>filter results</button>
            </div>
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
                <BrowseTableBody recipesArray={ data } userEmail={ userEmail } />
            </table>
        </div>
    );
}

export default BrowseTableBuild;
