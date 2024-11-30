import React from 'react';
import { TextField, Button } from '@mui/material';

const LoginPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const login = form.get('login');
        const password = form.get('password');

        // Здесь можно обработать логику логина
        console.log('login:', login);
        console.log('Password:', password);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh", // Заполняем весь экран по высоте
                width: "100vw", // Заполняем весь экран по ширине
                backgroundColor: "#121212", // Тёмный фон
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
                            style: { color: 'white' }, // Белый текст в поле ввода
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' }, // Серый цвет для label
                        }}
                        style={{
                            backgroundColor: '#333', // Темный фон для поля
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
                            style: { color: 'white' }, // Белый текст в поле ввода
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' }, // Серый цвет для label
                        }}
                        style={{
                            backgroundColor: '#333', // Темный фон для поля
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
                            color: 'black', // Белый текст на кнопке
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
