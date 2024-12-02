import React from 'react';
import Room from './pages/RoomPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentPage from './pages/StudentPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={< LoginPage />} />
                <Route path="/" element={< Room />} />
                <Route path="/student" element={< StudentPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;