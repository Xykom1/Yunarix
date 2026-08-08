import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { logged, loading } = useAuth();

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!logged) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;