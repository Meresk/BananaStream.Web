import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "../services/authService";
import ClipLoader from "react-spinners/ClipLoader";
import { Room } from "../types/Room.ts";

const TeacherPage: React.FC = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [roomName, setRoomName] = useState('');
    const [maxParticipants, setMaxParticipants] = useState<number | ''>('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const validateAuth = async () => {

            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                setLoading(false);
                fetchRooms();
            }
        };

        validateAuth();
    }, [navigate]);

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
            setRooms(response.data);
        } catch (error) {
            setError('Error fetching rooms');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleRoomCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!roomName) {
            setError('Room name is required');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/createRoom`, {
                room_name: roomName,
                max_participants: maxParticipants || undefined,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                alert('Room created successfully');
                setRoomName('');
                setMaxParticipants('');
                setTimeout(() => {
                    fetchRooms();
                }, 5000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError('Error creating room: ' + error.response?.data.error);
            } else {
                setError('Unexpected error occurred');
            }
        }
    };

    const handleRoomClick = async (roomName: string) => {
        const uniqueValue = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getTeacherToken`, {
                room: roomName,
                identity: uniqueValue,
            }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            if (response.status === 200) {
                const { token: roomToken } = response.data;
                navigate('/room', { state: { roomToken, roomName } });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError('Error joining room: ' + error.response?.data.error);
            } else {
                setError('Unexpected error occurred');
            }
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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#121212",
                padding: '20px',
                boxSizing: 'border-box',
                gap: '20px',
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
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Создание комнаты
                </Typography>

                <form onSubmit={handleRoomCreate}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Название"
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
                        label="Макс. кол-во участников"
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
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        Создать
                    </Button>
                </form>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        gap: '10px',
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        style={{
                            backgroundColor: '#444',
                            color: 'white',
                            borderColor: '#666',
                            flex: 1,
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#ff5555',
                            color: 'white',
                            flex: 1,
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        Выход
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: '#333',
                    padding: '20px',
                    borderRadius: '8px',
                    color: 'white',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h5" style={{ marginBottom: '20px' }}>
                    Существующие комнаты
                </Typography>

                <Grid container spacing={3}>
                    {rooms.map((room, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                onClick={() => handleRoomClick(room.name)}
                                style={{
                                    backgroundColor: '#FDFFAB',
                                    color: 'white',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                <CardContent style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            marginBottom: '10px',
                                            color: "black"
                                        }}
                                    >
                                        {room.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            color: '#606060',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {room.num_participants} котиков в комнате
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
