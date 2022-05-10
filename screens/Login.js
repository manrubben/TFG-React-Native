import React, {useContext, useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Layout from "./Layout";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, getValue, setValue, getV} from "../helpers/AuthContext";


const Login = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authState, setAuthState } = useContext(AuthContext);
/*
    const setValue = async (item, token) => {
        await AsyncStorage.setItem(item, token)
    }

    const getValue = async (item) => {
        const value = await AsyncStorage.getItem(item)
        return value;
    }
*/

    const login = async () => {
        const data = { username: username, password: password };
        await axios.post("http://192.168.1.220:3001/users/login", data)
            .then((response) => {
                if(response.data.error) {
                    alert(response.data.error)
                } else {
                    setValue("accessToken", response.data.token)
                    setAuthState({username: response.data.username, id: response.data.id, rol: response.data.rol, status: true});
                    navigation.navigate("Home")
                }
            }).catch(e => {
                console.log(e)
            })
    }

    return(
        <Layout>
            <Text style={{color: "black", fontSize: 15}}>Username:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
            />
            <Text style={{color: "black", fontSize: 15}}>Password:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.buttonSave} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </Layout>


    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginBottom: 7,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#10ac84",
        height: 30,
        color: "black",
        textAlign: "center",
        padding: 4,
        borderRadius: 5,
    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: "#10ac84",
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default Login;
