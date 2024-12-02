import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from '../types/Room';

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Функция для получения комнат
    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Room[]>('http://localhost:3000/rooms');
            setRooms(response.data); // Устанавливаем комнаты в состояние
        } catch (err) {
            setError('Ошибка получения комнат');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms(); // Получаем комнаты при монтировании компонента
    }, []);

    if (loading) {
        return <div>Загрузка...</div>; // Показать индикатор загрузки
    }

    if (error) {
        return <div>{error}</div>; // Показать ошибку
    }

    return (
        <div>
            <h1>Список комнат</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.name}>
                        Название: {room.name} Кол-во участников: {room.num_participants}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
