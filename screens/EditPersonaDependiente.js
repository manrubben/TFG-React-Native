import React, {useEffect, useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from 'formik';
import * as Yup from "yup";
import Layout from "./Layout";

const EditPersonaDependiente = ({navigation, route}) => {

    const id = route.params.id
    const [personaDependiente, setPersonaDependiente] = useState({});

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/personasDependientes/show/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setPersonaDependiente(response.data);
            }).catch((e) => console.log(e))
    }, [])

    const initialValues = {
        nombre: personaDependiente.nombre,
        apellidos: personaDependiente.apellidos,
        enfermedad: personaDependiente.enfermedad,
        gradoDeDependencia: personaDependiente.gradoDeDependencia,
        pastillasDia: personaDependiente.pastillasDia,
        pastillasTarde: personaDependiente.pastillasTarde,
        pastillasNoche: personaDependiente.pastillasNoche
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("Debes introducir un nombre"),
        apellidos: Yup.string().required("Debes introducir los apellidos"),
        enfermedad: Yup.string().required("Debes introducir la enfermedad"),
    });

    const editPersonaDependiente = async (values) => {

        const data = {
            nombre: values.nombre,
            apellidos: values.apellidos,
            enfermedad: values.enfermedad,
            gradoDeDependencia: values.gradoDeDependencia,
            pastillasDia: values.pastillasDia,
            pastillasTarde: values.pastillasTarde,
            pastillasNoche: values.pastillasNoche,
        }

        const token = await AsyncStorage.getItem("accessToken")
        await axios.put(`http://192.168.1.220:3001/personasDependientes/edit/${id}`, data,
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
                onSubmit={editPersonaDependiente}
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

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Enfermedad:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('enfermedad')}
                            onBlur={handleBlur('enfermedad')}
                            value={values.enfermedad}
                            placeholder="(Ej. Parkinson...)">
                        </TextInput>
                        <Text style={{color: "red", fontSize: 15}}>{touched.enfermedad && errors.enfermedad}</Text>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Grado de dependencia:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('gradoDeDependencia')}
                            onBlur={handleBlur('gradoDeDependencia')}
                            value={values.gradoDeDependencia}
                            placeholder="(Ej. 32%...)">
                        </TextInput>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de dia:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('pastillasDia')}
                            onBlur={handleBlur('pastillasDia')}
                            value={values.pastillasDia}
                            placeholder="(Ej. Aspirina...)">
                        </TextInput>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de tarde:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('pastillasTarde')}
                            onBlur={handleBlur('pastillasTarde')}
                            value={values.pastillasTarde}
                            placeholder="(Ej. Ibuprofeno...)">
                        </TextInput>

                        <Text style={{color: "black", fontSize: 15, marginVertical: '3%'}}>Pastillas de noche:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('pastillasNoche')}
                            onBlur={handleBlur('pastillasNoche')}
                            value={values.pastillasNoche}
                            placeholder="(Ej. Dormidina...)">
                        </TextInput>
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

export default EditPersonaDependiente;
