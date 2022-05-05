import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Layout from "./Layout";

const ShowAuxiliar = ({navigation, route}) => {

    const [auxiliar, setAuxiliar] = useState({});
    const id = route.params.id
    const isFocused = useIsFocused();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/users/auxiliares/show/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setAuxiliar(response.data);
            }).catch((e) => console.log(e))
    }, [isFocused])

    const deleteAuxiliar = async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.delete(`http://192.168.1.220:3001/users/auxiliares/delete/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigation.navigate("GestionarAuxiliares")
                }
            }).catch((e) => console.log(e))
    }

    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.itemTitle}>Nombre: {auxiliar.nombre}</Text>
                <Text style={styles.itemTitle}>Apellidos: {auxiliar.apellidos}</Text>
                <Text style={styles.itemTitle}>Teléfono: {auxiliar.telefono}</Text>
                <Text style={styles.itemTitle}>Username: {auxiliar.username}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditAuxiliar", {id: route.params.id})}>
                <Text style={styles.itemTitle}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteAuxiliar}>
                <Text style={styles.itemTitle}>Eliminar</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: "#005A9C",
        padding: 20,
        marginVertical: '5%',
        alignItems: "center",
        borderRadius: 5,
    },
    itemTitle: {
        color: "#ffffff",
    },
    editButton: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FF9700',
        marginBottom: '5%'
    },
    deleteButton: {
        marginBottom: '5%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FF0000',
    }
})

export default ShowAuxiliar;
