
import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import Layout from "./Layout";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePersonaDependiente = ({navigation}) => {
    const [personaNombre, setPersonaNombre] = useState("");
    const [personaApellidos, setPersonaApellidos] = useState("");
    const [personaEnfermedad, setPersonaEnfermedad] = useState("");
    const [personaGradoDeDependencia, setPersonaGradoDeDependencia] = useState("");
    const [personaPastillasDia, setPersonaPastillasDia] = useState("");
    const [personaPastillasTarde, setPersonaPastillasTarde] = useState("");
    const [personaPastillasNoche, setPersonaPastillasNoche] = useState("");

    const addPersonaDependiente = async () => {
        const data = {
            nombre: personaNombre,
            apellidos: personaApellidos,
            enfermedad: personaEnfermedad,
            gradoDeDependencia: personaGradoDeDependencia,
            pastillasDia: personaPastillasDia,
            pastillasTarde: personaPastillasTarde,
            pastillasNoche: personaPastillasNoche,
        }
        const token = await AsyncStorage.getItem("accessToken")
        await axios.post("http://192.168.1.220:3001/personasDependientes/create", data,
            {headers: {accessToken: token}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error)
                } else {
                    navigation.navigate("GestionarPersonasDependientes")
                }
            }).catch(e => {
                console.log(e)
        })
    }

    return (
        <ScrollView>
            <Layout>
                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaNombre(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Apellidos:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaApellidos(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Enfermedad:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaEnfermedad(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Grado de dependencia:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaGradoDeDependencia(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de dia:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaPastillasDia(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de tarde:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaPastillasTarde(text)}>
                </TextInput>

                <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de noche:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPersonaPastillasNoche(text)}>
                </TextInput>

                <TouchableOpacity style={styles.button} onPress={addPersonaDependiente}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginBottom: 7,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "dodgerblue",
        height: 30,
        color: "black",
        textAlign: "center",
        padding: 4,
        borderRadius: 5,
    },
    button: {
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#33FF49',
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default CreatePersonaDependiente;
