import "@livekit/components-styles";
import {useNavigate} from "react-router-dom";
// import logo from '../assets/bananastreamlogo.png'
import logo from '/bananastreamlogotitle.png'

export default function Room() {
    const navigate = useNavigate();

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
                                src="/teacher.png" // Укажите путь к изображению для преподавателя
                                alt="Преподаватель"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.1)"; // Увеличение при наведении
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)"; // Возвращаем в исходное состояние
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
                                src="/student.png" // Укажите путь к изображению для студента
                                alt="Студент"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.1)"; // Увеличение при наведении
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)"; // Возвращаем в исходное состояние
                                }}
                            />
                            <span style={{ marginTop: "10px", color: "white", fontSize: "1.2rem" }}>Студент</span>
                        </div>
                    </div>
                </div>
            </div>
        );
}
