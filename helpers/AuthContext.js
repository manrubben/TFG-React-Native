import {createContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext("");

const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/users/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({...authState, status: false});
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        rol: response.data.rol,
                        status: true,
                    });
                    console.log(response.data.rol)
                }
            });
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );

}

export { AuthContext, AuthProvider };
