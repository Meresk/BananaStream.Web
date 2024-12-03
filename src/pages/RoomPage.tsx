// import { useState } from "react";
// import {
//     ControlBar,
//     GridLayout,
//     LiveKitRoom,
//     ParticipantTile,
//     useTracks,
// } from "@livekit/components-react";
// import { Track } from "livekit-client";
// import axios from "axios";
import "@livekit/components-styles";
import {useNavigate} from "react-router-dom";
import logo from '../assets/bananastreamlogo.png'

// const serverUrl = "wss://haha-1b7hsnu1.livekit.cloud";

export default function Room() {
    // const [role, setRole] = useState<"teacher" | "student" | null>(null); // Роль пользователя
    // const [token, setToken] = useState<string | null>(null); // Токен для подключения
    const navigate = useNavigate();

    // const handleRoleSelection = async (selectedRole: "teacher" | "student") => {
    //     try {
    //         const response = await axios.post("http://127.0.0.1:3000/getToken", {
    //             room: "classroom", // Имя комнаты
    //             identity: `${selectedRole}-${Date.now()}`, // Уникальная идентичность
    //             role: selectedRole, // Передача роли
    //         });
    //         setToken(response.data.token); // Сохраняем токен
    //         setRole(selectedRole); // Сохраняем роль
    //     } catch (error) {
    //         console.error("Ошибка получения токена:", error);
    //     }
    // };

    // if (!role || !token) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh", // Заполняем весь экран по высоте
                    width: "100vw", // Заполняем весь экран по ширине
                    backgroundColor: "#121212",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "130px" }}>
                    <img style={{ height: 300, width: 340 }} src={logo} alt="Logo" />
                    <h1 style={{ color: "white", fontSize: "3rem" }}>Кто вы сегодня?</h1>
                    <div style={{ display: "flex", gap: "100px", marginTop: "20px" }}>
                        {/* Преподаватель */}
                        <div
                            onClick={() => navigate("/login")}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="../../public/teacher.png" // Укажите путь к изображению для преподавателя
                                alt="Преподаватель"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            />
                            <span style={{ marginTop: "10px", color: "white", fontSize: "1.2rem" }}>Преподаватель</span>
                        </div>

                        {/* Студент */}
                        <div
                            onClick={() => navigate("/student")}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="../../public/student.png" // Укажите путь к изображению для студента
                                alt="Студент"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            />
                            <span style={{ marginTop: "10px", color: "white", fontSize: "1.2rem" }}>Студент</span>
                        </div>
                    </div>
                </div>
            </div>
        );

    // }

    // return (
    //     <LiveKitRoom
    //         video={false} // Включаем камеру только для учителя
    //         audio={false}
    //         token={token}
    //         serverUrl={serverUrl}
    //         data-lk-theme="default"
    //         style={{height: "100vh", width: "100vw"}} // Полная высота и ширина экрана
    //     >
    //         <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
    //             <MyVideoConference/>
    //             <ControlBar/>
    //         </div>
    //     </LiveKitRoom>
    // );
}

// function MyVideoConference() {
//     const tracks = useTracks(
//         [
//             {source: Track.Source.Camera, withPlaceholder: true},
//             {source: Track.Source.ScreenShare, withPlaceholder: false},
//         ],
//         {onlySubscribed: false}
//     );
//
//     return (
//         <GridLayout
//             tracks={tracks}
//             style={{height: "100%", display: "flex"}} // Полная высота для сетки
//         >
//             <ParticipantTile/>
//         </GridLayout>
//     );
// }