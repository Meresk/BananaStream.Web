import React, { useEffect, useState } from "react";
import { checkAuth } from "../services/authService";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const TeacherPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        const validateAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                navigate("/login");
            } else {
                setLoading(false); // Аутентифицирован - снимаем загрузку
            }
        };

        validateAuth();
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <ClipLoader color="#36D7B7" size={50} />
            </div>
        );
    }

    return (
        <div>
            <p>Добро пожаловать в TeacherPage!</p>
        </div>
    );
};

export default TeacherPage;
