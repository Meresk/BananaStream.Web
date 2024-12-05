import axios from "axios";

export const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const response = await axios.get("http://127.0.0.1:3000/isAuth", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200; // Если сервер вернул OK
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Network error:', error.message);
        }
        return false;
    }
};
