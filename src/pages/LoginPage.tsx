import React, {useEffect, useState} from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../services/authService.tsx";
import ClipLoader from "react-spinners/ClipLoader"; // Импортируйте axios

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        const validateAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                setLoading(false)
            } else {
                navigate("/teacher")// Аутентифицирован - снимаем загрузку
            }
        };

        validateAuth();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw", }}>
                <ClipLoader color="#36D7B7" size={50} />
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const login = form.get('login');
        const password = form.get('password');

        try {
            // Отправка данных на сервер с помощью axios
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                login,
                password,
            });

            // Проверка успешного ответа
            if (response.status === 200) {
                // Сохранение JWT в localStorage
                localStorage.setItem('token', response.data.token);
                const isAuthenticated = await checkAuth();
                if (!isAuthenticated) {
                    navigate("/login"); // Перенаправление на логин, если токен недействителен
                } else {
                    navigate("/teacher")
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login failed:', error.response?.data.error || error.message);
                // Здесь можно отобразить сообщение об ошибке
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#121212",
            }}
        >
            <div style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' },
                        }}
                        style={{
                            backgroundColor: '#333',
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' },
                        }}
                        style={{
                            backgroundColor: '#333',
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                            margin: '20px 0',
                            backgroundColor: '#ffff99',
                            color: 'black',
                            fontFamily: "Arial",
                        }}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;