import {createContext, useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext("");

export const setValue = async (item, token) => {
    await AsyncStorage.setItem(item, token)
}

export const getValue = async (item) => {
    const value = await AsyncStorage.getItem(item)
    return value
}

export const removeItem = async (item) => {
    try {
        await AsyncStorage.removeItem(item)
    } catch (e) {
        console.log(e)
    }
}

/*
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
                    accessToken: AsyncStorage.getItem("accessToken"),
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
 */
