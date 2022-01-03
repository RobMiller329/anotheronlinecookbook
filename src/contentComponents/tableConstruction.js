import React from "react";
import { useState } from "react";
import { useTable, usePagination, useFilters } from "react-table";
//import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

function ConstructedTable( {columns, data} )
{
    const
    {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        setFilter
    } = useTable( {columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
        useFilters,
        usePagination )

    const [nameFilterInput, setNameFilterInput] = useState("");
    const [proteinFilterInput, setProteinFilterInput] = useState("");
    const [cuisineFilterInput, setCuisineFilterInput] = useState("");
    const [sourceFilterInput, setSourceFilterInput] = useState("");

    const handleNameFilterChange = event =>
    {
        const value = event.target.value || undefined;
        setFilter("recipeName", value);
        setNameFilterInput(value);
    }

    const handleProteinFilterChange = event =>
    {
        const value = event.target.value || undefined;
        setFilter("Protein", value);
        setProteinFilterInput(value);
    }

    const handleCuisineFilterChange = event =>
    {
        const value = event.target.value || undefined;
        setFilter("Cuisine", value);
        setCuisineFilterInput(value);
    }

    const handleSourceFilterChange = event =>
    {
        const value = event.target.value || undefined;
        setFilter("Source", value);
        setSourceFilterInput(value);
    }

    return (
        <div>
            <div>
                <input value={nameFilterInput} onChange={handleNameFilterChange} placeholder={"Type Here To Search By Name"} />
                <input value={proteinFilterInput} onChange={handleProteinFilterChange} placeholder={"Type Here To Search By Protein"} />
                <input value={cuisineFilterInput} onChange={handleCuisineFilterChange} placeholder={"Type Here To Search By Cuisine"} />
                <input value={sourceFilterInput} onChange={handleSourceFilterChange} placeholder={"Type Here To Search By Source"} />
            </div>
            <table {...getTableProps()}>
                <thead>
                    { headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            { headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}> { column.render('Header') } </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    { page.map((row, i) => 
                        {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) =>
                                        {
                                            return <td {...cell.getCellProps()}> { cell.render('Cell') } </td>
                                        }
                                    )}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="pagination">
                <div className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <button className="page-link">First</button>
                </div>
                <div className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <button className="page-link">{'<'}</button>
                </div>
                <div className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <button className="page-link">{'>'}</button>
                </div>
                <div className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <button className="page-link">Last</button>
                </div>
                <div>
                    <p>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </p>
                </div>
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 40].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ConstructedTable;