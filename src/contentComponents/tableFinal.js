import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { recipeTableColumns } from "./tableColumns";
import ConstructedTable from "./tableConstruction";
import Trending from "./ContentTrending";
import "./StyleTables.css";

function FinalTable(props)
{
    const [data, setData] = useState([]);

    const viewRecipesAPICall = Axios.create(
    {
        //baseURL: `http://anotheronlinecookbook.com/api/`
        baseURL: `http://localhost:8080/api/`
    });

    useEffect(() =>
    {
        async function fetchData(passedID)
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
    });

    return (
        <div className="finalTableContainer">
            <div className="tableComponent">
                <ConstructedTable columns={recipeTableColumns} data={data} />
            </div>
            <div className="trendingComponent">
                <Trending />
            </div>
        </div>
    );
}

export default FinalTable;