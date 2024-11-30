import React from 'react';
import Room from './pages/RoomPage';
// import Login from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Room />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;