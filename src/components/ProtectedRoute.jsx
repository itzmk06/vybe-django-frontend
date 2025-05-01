import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Ensure correct path
import Loader from "./helper/Loader";

const ProtectedRoute = ({ children }) => {
    return children;
};

export default ProtectedRoute; 
