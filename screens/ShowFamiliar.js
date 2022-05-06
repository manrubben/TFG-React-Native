import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useIsFocused, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Layout from "./Layout";

const ShowFamiliar = ({route}) => {

    const [familiar, setFamiliar] = useState({});
    const id = route.params.id
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/users/familiares/show/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setFamiliar(response.data);
            }).catch((e) => console.log(e))
    }, [isFocused])

    const deleteFamiliar = async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.delete(`http://192.168.1.220:3001/users/familiares/delete/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigation.navigate("GestionarFamiliares")
                }
            }).catch((e) => console.log(e))
    }

    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.itemTitle}>Nombre: {familiar.nombre}</Text>
                <Text style={styles.itemTitle}>Apellidos: {familiar.apellidos}</Text>
                <Text style={styles.itemTitle}>Teléfono: {familiar.telefono}</Text>
                <Text style={styles.itemTitle}>Username: {familiar.username}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditFamiliar", {id: route.params.id})}>
                <Text style={styles.itemTitle}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteFamiliar}>
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

export default ShowFamiliar;
