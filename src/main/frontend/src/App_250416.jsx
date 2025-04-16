import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';


function App() {
    const [customers, setCustomers] = useState([]);
    const [stores, setStores] = useState([]);
    const [form, setForm] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        activebool: false,
        storeId: ''
    });

    const fetchCustomers = async () => {
        const res = await axios.get('/api/customers');
        setCustomers(res.data);
    };

    // Store 데이터 가져오기
    const fetchStores = async () => {
        const res = await axios.get('/api/stores');
        setStores(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            await axios.put(`/api/customers/${form.id}`, form);
        } else {
            await axios.post('/api/customers', form);
        }
        setForm({ id: '', firstName: '', lastName: '', email: '', activebool: false });
        fetchCustomers();
    };

    const handleEdit = (c) => {
        setForm(c);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/customers/${id}`);
        fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
        fetchStores();
    }, []);

    const columns = [
        {
            name: 'First Name',
            selector: (row) => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: (row) => row.lastName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Active',
            selector: (row) => (row.activebool ? 'Yes' : 'No'),
        },
        {
            name: 'Store ID',
            selector: (row) => row.storeId,
            omit: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Customer List</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                <input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <label>
                    <input type="checkbox" checked={form.activebool} onChange={(e) => setForm({ ...form, activebool: e.target.checked })} />
                    Active
                </label>
                <select
                    value={form.storeId}
                    onChange={(e) => setForm({ ...form, storeId: e.target.value })}
                >
                    <option value="">Select Store</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.id}
                        </option>
                    ))}
                </select>
                <button type="submit">{form.id ? 'Update' : 'Add'}</button>
            </form>
            <DataTable
                title="Customer List"
                columns={columns}
                data={customers}
                pagination
            />
        </div>
    );
}

export default App;