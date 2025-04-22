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

            const rowMenu = [
                {
                    label: "<i class='fas fa-user'></i> Change Name",
                    action: function (e, row) {
                        row.update({ name: "Steve Bobberson" });
                    },
                },
                {
                    label: "<i class='fas fa-check-square'></i> Select Row",
                    action: function (e, row) {
                        row.select();
                    },
                },
                { separator: true },
                {
                    label: "Admin Functions",
                    menu: [
                        {
                            label: "<i class='fas fa-trash'></i> Delete Row",
                            action: function (e, row) {
                                row.delete();
                            },
                        },
                        {
                            label: "<i class='fas fa-ban'></i> Disabled Option",
                            disabled: true,
                        },
                    ],
                },
            ];

            const headerMenu = function () {
                const menu = [];
                const columns = this.getColumns();

                for (let column of columns) {
                    const icon = document.createElement('i');
                    icon.classList.add('fas');
                    icon.classList.add(column.isVisible() ? 'fa-check-square' : 'fa-square');

                    const label = document.createElement('span');
                    const title = document.createElement('span');

                    console.log("column.getDefinition().title:"+column.getDefinition().title);

                    if("#" == column.getDefinition().title || undefined == column.getDefinition().title){
                        continue;
                    }

                    title.textContent = ' ' + column.getDefinition().title;

                    label.appendChild(icon);
                    label.appendChild(title);

                    menu.push({
                        label: label,
                        action: function (e) {
                            e.stopPropagation();
                            column.toggle();
                            if (column.isVisible()) {
                                icon.classList.remove('fa-square');
                                icon.classList.add('fa-check-square');
                            } else {
                                icon.classList.remove('fa-check-square');
                                icon.classList.add('fa-square');
                            }
                        },
                    });
                }

                return menu;
            };


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
                selectableRows: true,
                rowContextMenu: rowMenu,
                columns: [
                    {
                        formatter: "rowSelection", // 체크박스
                        titleFormatter: "rowSelection", // 헤더에도 체크박스
                        headerHozAlign:"center",
                        hozAlign: "center",
                        headerSort: false,
                        cellClick: function (e, cell) {

                            e.stopPropagation();
                            cell.getRow().toggleSelect();
                        },
                        width: 50,
                    },
                    {
                        formatter: "rownum", // 행 번호
                        title: "#",
                        headerHozAlign:"center",
                        hozAlign: "center",
                        headerSort: false,
                        width: 50,
                    },
                    { title: 'First Name', field: 'firstName', sorter: 'string', headerMenu: headerMenu },
                    { title: 'Last Name', field: 'lastName', sorter: 'string', headerMenu: headerMenu },
                    { title: 'Email', field: 'email', sorter: 'string', headerMenu: headerMenu },
                    { title: 'Active', field: 'activebool', formatter: 'tickCross', headerMenu: headerMenu },
                    { title: 'Store ID', field: 'storeId', sorter: 'number', headerMenu: headerMenu },
                ],
            });

            // 명시적으로 rowClick 이벤트 등록
            tableRef.current.on("rowClick", (e, row) => {
                console.log("행 클릭됨:", row.getData());
                alert(`${row.getData().name}님의 행이 선택되었습니다.`);
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