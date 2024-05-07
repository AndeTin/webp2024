import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function App() {
    const [currentData, setCurrentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 10;
    let currentPage = 1;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
        fetch(openUrl)
            .then(response => response.json())
            .then(data => addNewData(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const addNewData = (dataset) => {
        // Add unique IDs to each row in the dataset
        const rowsWithIds = dataset.map((row, index) => ({
            id: index + 1,
            title: row.title,
            location: row.showInfo[0]?.location || '', // Assuming location is in showInfo array
            price: row.showInfo[0]?.price || '', // Assuming price is in showInfo array
        }));

        setCurrentData(rowsWithIds);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = currentData.filter(row =>
        row.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'location', headerName: 'Location', width: 300 },
        { field: 'price', headerName: 'Price', width: 130 },
        // Add more columns as needed
    ];

    return (
        <div style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '16px' }}
            />
            <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
                pagination
            />
        </div>
    );
}

export default App;
