import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {

    const { logged, loading } = useAuth();

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (logged) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default GuestRoute;