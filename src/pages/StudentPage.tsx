import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";
import { Room } from "../types/Room.ts";

const StudentPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const validateAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                setLoading(false);
                fetchRooms(); // Загружаем комнаты после успешной аутентификации
            }
        };

        validateAuth();
    }, [navigate]);

    const fetchRooms = async () => {
        const response = await axios.get('http://127.0.0.1:3000/rooms');
        setRooms(response.data);
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <ClipLoader color="#36D7B7" size={50} />
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center", // Центрируем список комнат
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#121212",
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            {/* Блок для отображения существующих комнат */}
            <Box
                sx={{
                    flexGrow: 1, // Занимает всё доступное пространство
                    backgroundColor: '#333',
                    padding: '20px', // Внутренние отступы внутри блока
                    margin: '20px', // Внешние отступы от краёв экрана
                    borderRadius: '8px',
                    color: 'white',
                    boxSizing: 'border-box',
                    overflowY: 'auto', // Прокрутка, если список слишком длинный
                    display: 'flex', // Flexbox для выравнивания
                    flexDirection: 'column',
                    alignItems: 'center', // Центрирование по горизонтали
                    justifyContent: rooms.length === 0 ? 'center' : 'flex-start', // Центрирование по вертикали, если комнат нет
                }}
            >
                {rooms.length > 0 ? (
                    <>
                        <Typography variant="h5" style={{ marginBottom: '20px', fontSize: '30px' }}>
                            Комнаты
                        </Typography>
                        <Grid container spacing={3}>
                            {rooms.map((room, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card style={{ backgroundColor: '#444', color: 'white' }}>
                                        <CardContent>
                                            <Typography variant="h6">{room.name}</Typography>
                                            <Typography variant="body2">
                                                {room.num_participants} котиков в комнате
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px', // Расстояние между картинкой и текстом
                        }}
                    >
                        <img
                            src="../../public/zerorooms.png" // Замените на ссылку на вашу картинку
                            alt="No rooms available"
                            style={{
                                maxWidth: '150px',
                                maxHeight: '150px',
                                opacity: 0.8, // Лёгкая прозрачность
                            }}
                        />
                        <Typography variant="h6" style={{ color: 'gray', textAlign: 'center' }}>
                            Комнат нет, котики уснули
                        </Typography>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default StudentPage;
