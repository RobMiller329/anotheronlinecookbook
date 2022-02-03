import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ConstructedTable from "./tableConstruction";
import { recipeTableColumns } from "./tableColumns";
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

    return (
        <div className="finalTable">
            <ConstructedTable columns={recipeTableColumns} data={data} />
        </div>
    );
}

export default FinalTable;