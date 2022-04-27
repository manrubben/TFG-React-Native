import React, {useContext, useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home'
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import GestionarPersonasDependientes from "./screens/GestionarPersonasDependientes";
import Login from "./screens/Login"
import Welcome from "./screens/Welcome";
import {AuthContext} from "./helpers/AuthContext";

const Stack = createNativeStackNavigator()

const App = () => {

    const { authState } = useContext(AuthContext);
    console.log(authState)

    return (
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
  )
}

export default App;
