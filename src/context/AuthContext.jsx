import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Axios instance
import Cookies from "js-cookie"; // For handling cookies

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getCsrfToken = () => {
        return Cookies.get('csrftoken');
    };

    const login = async (email, password) => {
        try {
            const csrfToken = getCsrfToken();
            const res = await api.post("/api/login/", { emailId: email, password }, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            console.log("Login Response:", res);
            setUser(res.data.data);
            navigate("/home");
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error(error.response?.data?.message || "Login failed. Try again!");
        }
    };

    const signup = async (userData) => {
        try {
            const csrfToken = getCsrfToken();
            const res = await api.post("/api/register/", userData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            console.log("Signup Response:", res);
            setUser(res.data.data);
            navigate("/home");
        } catch (error) {
            console.error("Signup failed:", error);
            throw new Error(error.response?.data?.message || "Signup failed. Try again!");
        }
    };

    const logout = async () => {
        try {
            const csrfToken = getCsrfToken();
            await api.post("/api/logout/", {}, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            setUser(null);
            console.log("User logged out");
            navigate("/");
            setTimeout(() => window.location.reload(), 100);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
