import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import GestionarPersonasDependientes from "../screens/GestionarPersonasDependientes";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from "react-native";
import CreatePersonaDependiente from "../screens/CreatePersonaDependiente";
import ShowPersonaDependiente from "../screens/ShowPersonaDependiente";
import EditPersonaDependiente from "../screens/EditPersonaDependiente";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const GestionarPersonasDependientesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GestionarPersonasDependientes"
                component={GestionarPersonasDependientes}
            />
            <Stack.Screen
                name="CreatePersonaDependiente"
                component={CreatePersonaDependiente}
            />
            <Stack.Screen
                name="ShowPersonaDependiente"
                component={ShowPersonaDependiente}
            />
            <Stack.Screen
                name="EditPersonaDependiente"
                component={EditPersonaDependiente}
            />
        </Stack.Navigator>
    );
};


const TabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: 'white'}
        }}>
            <Tab.Screen name="Home2" component={Home} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name="Pers. dependientes" component={GestionarPersonasDependientesStack} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="people" color={color} size={size} />
                )
            }}/>
        </Tab.Navigator>
        );
}

export default TabNavigator;
