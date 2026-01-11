import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Tasks() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Create Form State
    const [createData, setCreateData] = useState({
        name: '',
        description: '',
        time: '' // for timestamp.time
    });

    // Edit State
    const [editingTask, setEditingTask] = useState(null); // The task object being edited
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: ''
    });

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await api.getAllTasks();
            setTasks(res.data);
            setError('');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 403) {
                // Auth failed
                navigate('/login');
            } else {
                setError('Failed to load tasks');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authData');
        navigate('/login');
    };

    // Create Handlers
    const handleCreateChange = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format time: "2026-01-11 10:30:00"
            // data.time comes from datetime-local: "2026-01-11T10:30"
            const formattedTime = createData.time.replace('T', ' ') + ':00';

            const payload = {
                name: createData.name,
                description: createData.description,
                timestamp: {
                    time: formattedTime
                }
            };

            await api.createTask(payload);
            setCreateData({ name: '', description: '', time: '' }); // Reset
            fetchTasks(); // Refresh
        } catch (err) {
            console.error(err);
            alert('Failed to create task');
        }
    };

    // Delete Handler
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.deleteTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to delete task');
        }
    };

    // Edit Handlers
    const startEdit = (task) => {
        setEditingTask(task);
        setEditFormData({
            name: task.name,
            description: task.description
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.updateTask(editingTask.id, editFormData);
            setEditingTask(null);
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to update task');
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-4" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }}>Task Manager</h1>
                <button onClick={handleLogout} className="btn-danger" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                    Logout
                </button>
            </header>

            {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}

            <div className="dashboard-layout">
                {/* Left Column: Create Task */}
                <div>
                    <div className="glass-card">
                        <h3 className="mb-4">Create New Task</h3>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={createData.name}
                                    onChange={handleCreateChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={createData.description}
                                    onChange={handleCreateChange}
                                    required
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Schedule Time</label>
                                <input
                                    type="datetime-local"
                                    name="time"
                                    value={createData.time}
                                    onChange={handleCreateChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                Create Task
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Task List */}
                <div>
                    <h3 className="mb-4">Your Tasks</h3>
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-secondary">No tasks found. Create one to get started!</p>
                    ) : (
                        <div className="task-grid">
                            {tasks.map(task => (
                                <div key={task.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{task.name}</h4>
                                        <span className={`status-badge`}>
                                            {task.completed ? 'Done' : 'Pending'}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                        {task.description}
                                    </p>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        <div>Schedule: {new Date(task.schedule).toLocaleString()}</div>
                                        <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                                    </div>

                                    <div className="flex gap-4" style={{ marginTop: 'auto' }}>
                                        <button
                                            onClick={() => startEdit(task)}
                                            style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', flex: 1, padding: '0.5rem' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="btn-danger"
                                            style={{ flex: 1, padding: '0.5rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal / Overlay */}
            {editingTask && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(5px)', zIndex: 50
                }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '400px', background: '#1e293b' }}>
                        <h3 className="mb-4">Edit Task</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditChange}
                                    required
                                    rows="3"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingTask(null)}
                                    style={{ flex: 1, background: 'rgba(148, 163, 184, 0.2)', color: 'var(--text-secondary)' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
