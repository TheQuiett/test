import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
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

    const tableRef = useRef(null);

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

    useEffect(() => {
        fetchCustomers();
        fetchStores();
    }, []);

    useEffect(() => {
        if (tableRef.current) {

            if (Tabulator.findTable(tableRef.current).length > 0) {
                Tabulator.findTable(tableRef.current)[0].destroy();
            }

            new Tabulator(tableRef.current, {
                data: customers,
                columns: [
                    { title: "Name", field: "name" },
                    { title: "Email", field: "email" },
                ],
            });
        }
    }, [customers]);

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

            <div ref={tableRef}></div>
        </div>
    );
}

export default App;