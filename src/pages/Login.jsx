import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await api.login(formData);
            // Store auth data exactly as returned
            localStorage.setItem('authData', JSON.stringify(res.data));
            navigate('/tasks');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-between items-center" style={{ minHeight: '80vh', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
                <p className="text-center" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/sign-up" style={{ color: 'var(--primary-color)' }}>Register</Link>
                </p>
            </div>
        </div>
    );
}
