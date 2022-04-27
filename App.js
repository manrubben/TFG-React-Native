import React, {useContext, useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home'
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import GestionarPersonasDependientes from "./screens/GestionarPersonasDependientes";
import Login from "./screens/Login"
import Welcome from "./screens/Welcome";
import Logged from "./screens/Logged";
import NotLogged from "./screens/NotLogged";
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getValue} from "./screens/Login"

const Stack = createNativeStackNavigator()

const App = () => {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    useEffect( async () => {
         await axios
            .get("http://192.168.1.220:3001/users/auth", {
                headers: {
                    accessToken: ''
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
                    console.log(response)
                    console.log("A")
                }
            })
            .catch(e => {
                console.log(e)
            });
    }, []);

    const logeado = true;

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={({navigation}) => ({
                            headerStyle: {
                                backgroundColor: "#222f3e",
                            },
                            headerTitleStyle: {
                                color: "#ffffff",
                            },
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <Text style={{color: '#ffffff', marginRight: 20, fontSize: 15}}>Login</Text>
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={({navigation}) => ({
                            headerStyle: {
                                backgroundColor: "#222f3e",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                color: "#ffffff",
                            },
                        })}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerStyle: {
                                backgroundColor: "#222f3e",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                color: "#ffffff",
                            },
                        }}
                    />
                    <Stack.Screen name="GestionarPersonasDependientes" component={GestionarPersonasDependientes}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

  )
}

export default App;
