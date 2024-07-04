import React, { useState, useEffect } from 'react';
import './MainPage.css';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import url from '../url'

const MainPage = () => {
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${url}/tasks/view`)
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    };

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setTaskName("");
        setDescription("");
        setPriority("");
        setStatus("");
        setShowAddModal(false);
    };

    const handleSaveAddData = () => {
        const newData = {
            taskName,
            description,
            priority,
            status
        };

        axios.post(`${url}/tasks/create`, newData)
            .then(res => {
                console.log("Task added successfully:", res.data);
                setShowAddModal(false);
                fetchData();
            })
            .catch(err => {
                console.error("Error adding task:", err);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${url}/tasks/delete/${id}`)
            .then(res => {
                console.log("Task deleted successfully:", res.data);
                fetchData();
            })
            .catch(err => {
                console.error("Error deleting task:", err);
            });
    };

    const handleStatusChange = (id, newStatus) => {
        setSelectedRow(id);
        setStatus(newStatus);

        axios.put(`${url}/tasks/update/${id}`, { status: newStatus })
            .then(res => {
                console.log("Task status updated successfully:", res.data);
                fetchData();
            })
            .catch(err => {
                console.error("Error updating task status:", err);
            });
    };

    const handleSignout = () => {
        navigate('/login');
    };

    const handleTaskNameChange = (id, newTaskName) => {
        axios.put(`${url}/tasks/update/${id}`, { taskName: newTaskName })
            .then(res => {
                console.log("Task name updated successfully:", res.data);
                fetchData();
            })
            .catch(err => {
                console.error("Error updating task name:", err);
            });
    };

    const handleDescriptionChange = (id, newDescription) => {
        axios.put(`${url}/tasks/update/${id}`, { description: newDescription })
            .then(res => {
                console.log("Task description updated successfully:", res.data);
                fetchData();
            })
            .catch(err => {
                console.error("Error updating task description:", err);
            });
    };

    const columns = [
        {
            name: 'Task Name',
            selector: (row) => row.taskName,
            cell: (row) => (
                <EditableField
                    value={row.taskName}
                    onChange={(newValue) => handleTaskNameChange(row._id, newValue)}
                />
            ),
            width: '25%'
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            cell: (row) => (
                <EditableField
                    value={row.description}
                    onChange={(newValue) => handleDescriptionChange(row._id, newValue)}
                    alignLeft={true}  // Add alignLeft prop
                />
            ),
            width: '35%'
        },
        { name: 'Priority', selector: (row) => row.priority, width: '15%' },
        {
            name: 'Status',
            selector: (row) => row.status,
            cell: (row) => (
                <div>
                    <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        style={{ border: 'none', width: '100%' }}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            ),
            width: '15%'
        },
        {
            name: '',
            cell: (row) => (
                <div className='justify-content-center'>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(row._id)}>
                        <i className="bi bi-trash"></i> {/* Bootstrap Icons for delete icon */}
                    </button>
                </div>
            ),
            width: '10%'
        }
    ];

    const EditableField = ({ value, onChange, alignLeft }) => {
        const [editMode, setEditMode] = useState(false);
        const [editedValue, setEditedValue] = useState(value);

        const handleEdit = () => {
            setEditMode(true);
            setEditedValue(value);
        };

        const handleSave = () => {
            onChange(editedValue);
            setEditMode(false);
        };

        return (
            <div style={{ textAlign: alignLeft ? 'left' : 'center' }}>
                {editMode ? (
                    <input
                        type="text"
                        className="form-control"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        onBlur={handleSave}
                        autoFocus
                    />
                ) : (
                    <div onClick={handleEdit}>{value}</div>
                )}
            </div>
        );
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-3 mb-3'>
                <div>
                    <i className="bi bi-person-circle h3"></i>
                </div>
                <div className='Actions'>
                    <button className='btn btn-primary' onClick={handleAddButtonClick}>Add Task</button>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSignout}>Sign Out</button>
                </div>
            </div>
            <div className='Details'>
                <Card>
                    <DataTable
                        title=''
                        columns={columns}
                        data={data}
                        pagination
                    />
                </Card>
            </div>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="taskName" className="form-label">Task Name</label>
                            <input type="text" className="form-control" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">Priority</label>
                            <select className="form-select" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleCloseAddModal}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSaveAddData}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainPage;
