import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const tableRef = useRef(null);

    const fetchCustomers = async () => {
        const res = await axios.get('/api/customers');
        setCustomers(res.data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            new Tabulator(tableRef.current, {
                width:"100%",
                height: "311px",
                data: customers,
                layout: "fitColumns",
                pagination: "local",
                paginationSize: 6,
                paginationSizeSelector: [3, 6, 8, 10],
                movableColumns: true,
                paginationCounter: "rows",
                columns: [
                    { title: 'First Name', field: 'firstName', sorter: 'string' },
                    { title: 'Last Name', field: 'lastName', sorter: 'string' },
                    { title: 'Email', field: 'email', sorter: 'string' },
                    { title: 'Active', field: 'activebool', formatter: 'tickCross' },
                    { title: 'Store ID', field: 'storeId', sorter: 'number' },
                ],
            });
        }
    }, [customers]);

    return (
        <div>
            <h2>Customer List</h2>
            <div ref={tableRef}></div>
        </div>
    );
}

export default App;