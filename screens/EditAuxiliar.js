import React, {useEffect, useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Yup from "yup";
import {Formik} from "formik";
import Layout from "./Layout";

const EditAuxiliar = ({navigation, route}) => {

    const id = route.params.id
    const [auxiliar, setAuxiliar] = useState({});

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/users/auxiliares/show/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setAuxiliar(response.data);
            }).catch((e) => console.log(e))
    }, [])

    const initialValues = {
        nombre: auxiliar.nombre,
        apellidos: auxiliar.apellidos,
        telefono: auxiliar.telefono,
        rol: "AUXILIAR",
        username: auxiliar.username,
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        telefono: Yup.string().required("Debes introducir un número de teléfono"),
        username: Yup.string().required("Debes introducir un nombre de usuario")
            .min(8, "El nombre de usuario debe tener al menos 8 caracteres")
            .max(16, "El nombre de usuario debe tener como máximo 16 caracteres"),
    });

    const editAuxiliar = async (values) => {

        const data = {
            nombre: values.nombre,
            apellidos: values.apellidos,
            telefono: values.telefono,
            username: values.username,
        }

        const token = await AsyncStorage.getItem("accessToken")
        await axios.put(`http://192.168.1.220:3001/users/auxiliares/edit/${id}`, data,
            {headers: {accessToken: token}})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error)
                } else {
                    navigation.goBack()
                }
            }).catch((e) => console.log(e))
    }

    return (
        <ScrollView>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editAuxiliar}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <Layout>
                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            value={values.nombre}
                            placeholder="(Ej. Juan...)">
                        </TextInput>
                        <Text style={{color: "red", fontSize: 15}}>{touched.nombre && errors.nombre}</Text>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Apellidos:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('apellidos')}
                            onBlur={handleBlur('apellidos')}
                            value={values.apellidos}
                            placeholder="(Ej. Rodríguez...)">
                        </TextInput>
                        <Text style={{color: "red", fontSize: 15}}>{touched.apellidos && errors.apellidos}</Text>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Teléfono:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('telefono')}
                            onBlur={handleBlur('telefono')}
                            value={values.telefono}
                            placeholder="(Ej. 622172737...)">
                        </TextInput>
                        <Text style={{color: "red", fontSize: 15}}>{touched.telefono && errors.telefono}</Text>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="(Ej. javier97...)">
                        </TextInput>
                        <Text style={{color: "red", fontSize: 15}}>{touched.username && errors.username}</Text>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </Layout>
                )}
            </Formik>
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
        width: '90%',
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

export default EditAuxiliar;
