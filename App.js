import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home'
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import GestionarPersonasDependientes from "./screens/GestionarPersonasDependientes";
import Login from "./screens/Login"
import Welcome from "./screens/Welcome";
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from "./components/CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons'
import TabNavigator from "./components/TabNavigator";

const Drawer = createDrawerNavigator();

//const Stack = createNativeStackNavigator();

const App = () => {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        rol: "",
        status: false,
    });

    useEffect( async () => {
        const token = await AsyncStorage.getItem("accessToken")
         await axios
            .get("http://192.168.1.220:3001/users/auth", {
                headers: {
                    accessToken: token
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
                    //console.log(response)
                    //console.log("A")
                }
            })
            .catch(e => {
                console.log(e)
            });
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={props => <CustomDrawer {...props} />}
                    screenOptions={{drawerInactiveTintColor: '#333', drawerLabelStyle: {marginLeft: -25, fontSize: 15}}}>

                    {!authState.status ? (
                        <>
                            <Drawer.Screen name="Welcome" component={Welcome} options={{
                                drawerIcon: ({color}) => (
                                    <Ionicons name="home-outline" size={22} color={color}/>
                                )
                            }}/>
                            <Drawer.Screen name="Login" component={Login} options={{
                                drawerIcon: ({color}) => (
                                    <Ionicons name="ios-log-in-outline" size={22} color={color}/>
                                )
                            }}/>
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name="Home" component={TabNavigator} options={{
                                title: 'App',
                                drawerIcon: ({color}) => (
                                    <Ionicons name="home-outline" size={22} color={color}/>
                                )
                            }}/>
                            <Drawer.Screen name="GestionarPersonasDependientes" component={GestionarPersonasDependientes} options={{
                                drawerIcon: ({color}) => (
                                    <Ionicons name="home-outline" size={22} color={color}/>
                                )
                            }}/>
                        </>
                    )}
                </Drawer.Navigator>
                    {/*
                    <Drawer.Screen name="Home" component={Home} options={{
                        drawerIcon: ({color}) => (
                            <Ionicons name="home-outline" size={22} color={color}/>
                        )
                    }}/>
                    <Drawer.Screen name="Login" component={Login} options={{
                        drawerIcon: ({color}) => (
                            <Ionicons name="ios-log-in-outline" size={22} color={color}/>
                        )
                    }}/>
                </Drawer.Navigator>
                */}
                {/*
                <Stack.Navigator>
                    {!authState.status ? (
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
                    ) : (
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
                        )}

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
                */}
            </NavigationContainer>
        </AuthContext.Provider>

  )
}

export default App;
