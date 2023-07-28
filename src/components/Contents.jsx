import React, { useState, useMemo, useCallback, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { deleteFood } from '../fetchers/itemFetcher';
import moment from "moment";

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
    },
    {
		name: 'Expiration Date',
        selector: row => row.exp_date,
        sortable: true,
        format: row => moment(row.exp_date).format("dddd, MMMM Do YYYY"),
    },
];

export const Contents = ({  fridgeContents, setFridgeContents, email }) => {
  	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	
	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);


	const contextActions = useMemo(() => {
		const handleDelete = async () => {
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				const res = await deleteFood(selectedRows, email);
        setFridgeContents(res);
			}
		};

		return (
			<button 
			  className="
			    bg-red-500 
				p-2 
				font-mynerve 
				shadow-xl 
				hover:transform 
				hover:transition-all 
				hover:scale-110
				hover:bg-red-600
			  "
			  key="delete" 
			  onClick={handleDelete} 
			  icon
			>
			  Delete
			</button>
		);
	}, [fridgeContents, selectedRows, toggleCleared]);

	return (
		<DataTable
            title="Fridge Contents"
			columns={columns}
			data={fridgeContents}
			selectableRows
            selectableRowsHighlight
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
		/>
  )
}