import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks" element={<Tasks />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
