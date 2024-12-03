import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";
import {Room} from "../types/Room.ts";

const TeacherPage: React.FC = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [roomName, setRoomName] = useState('');
    const [maxParticipants, setMaxParticipants] = useState<number | ''>('');
    const [rooms, setRooms] = useState<Room[]>([]); // Хранение списка комнат
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const validateAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                setLoading(false);
                fetchRooms(); // После успешной аутентификации загружаем комнаты
            }
        };

        validateAuth();
    }, [navigate]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/rooms');
            setRooms(response.data);
        } catch (error) {
            setError('Error fetching rooms');
        }
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
            }}>
                <ClipLoader color="#36D7B7" size={50} />
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!roomName) {
            setError('Room name is required');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3000/createRoom', {
                room_name: roomName,
                max_participants: maxParticipants || undefined,
            }, {
                headers: { Authorization: `Bearer ${token}` }  // Заголовок с токеном
            });

            if (response.status === 200) {
                alert('Room created successfully');
                fetchRooms(); // Обновить список комнат после создания новой
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError('Error creating room: ' + error.response?.data.error);
            } else {
                setError('Unexpected error occurred');
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#121212",
                padding: '20px',
                boxSizing: 'border-box', // Это важно для корректного вычисления размеров
            }}
        >
            <Box
                sx={{
                    width: '20%',
                    minWidth: '320px',
                    backgroundColor: '#333',
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white',
                    height: 'auto', // Подстраивается по содержимому
                    overflow: 'hidden',
                    boxSizing: 'border-box', // Учитываем все отступы
                }}
            >
                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Create Room
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Room Name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' },
                        }}
                        style={{ backgroundColor: '#555' }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Max Participants"
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{
                            style: { color: 'white' },
                        }}
                        InputLabelProps={{
                            style: { color: 'gray' },
                        }}
                        style={{ backgroundColor: '#555' }}
                    />

                    {error && (
                        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#ffff99',
                            color: 'black',
                        }}
                    >
                        Create Room
                    </Button>
                </form>
            </Box>

            <Box
                sx={{
                    width: '55%',
                    backgroundColor: '#333',
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white',
                    overflowY: 'auto',
                    boxSizing: 'border-box', // Учитываем все отступы
                }}
            >
                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Existing Rooms
                </Typography>

                <Grid container spacing={3}>
                    {rooms.map((room, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={{ backgroundColor: '#444', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6">{room.name}</Typography>
                                    <Typography variant="body2">
                                        {room.num_participants} participants
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default TeacherPage;
