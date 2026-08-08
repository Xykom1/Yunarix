import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, logout as apiLogout } from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function checkAuth() {

            try {

                const data = await getAuth();
                setLogged(data.logged);

            } catch (error) {

                console.error(error);
                setLogged(false);

            } finally {

                setLoading(false);

            }

        }

        checkAuth();

    }, []);


    async function logout() {

        const data = await apiLogout();

        if (data.success) {
            setLogged(false);
        }

        return data;

    }


    function login() {
        setLogged(true);
    }


    return (
        <AuthContext.Provider
            value={{
                logged,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}