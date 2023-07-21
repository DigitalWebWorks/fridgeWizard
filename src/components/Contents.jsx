import React, { useState, useMemo, useCallback, useEffect } from 'react'
import differenceBy from 'lodash/differenceBy'
import DataTable from 'react-data-table-component';
import { deleteFood } from '../fetchers/itemFetcher';

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
        selector: row => row.expDate,
        sortable: true,
    },
];

// const tableDataItems = [
//     {
//         id: 1,
//         name: 'leftovers',
//         type: 'cooked food',
//         expDate: "07-10-2023"
//     },
//     {
//         id: 2,
//         name: 'apple',
//         type: 'fruit',
//         expDate: "07-23-2023"
//     },
//     {
//         id: 3,
//         name: 'pizza',
//         type:'cooked food',
//         expDate: "07-14-2023"
//     },
// ]


export const Contents = ({ fridgeContents, setFridgeContents, isLoading, email }) => {
    const [selectedRows, setSelectedRows] = useState([]);
	const [itemsToDelete, setItemsToDelete] = useState(false);
	const [toggleCleared, setToggleCleared] = useState(false);
	
	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);


	const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setFridgeContents(differenceBy(fridgeContents, selectedRows));
				setItemsToDelete(true);
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

	useEffect(() => {
		const tryDeleteFood = async () => {
			await deleteFood(fridgeContents, email)
		}
		
		if (!isLoading && itemsToDelete) {
			tryDeleteFood();
			setItemsToDelete(false);
		}
		
	}, [fridgeContents])

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

