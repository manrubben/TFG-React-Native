import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {useIsFocused, useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import PersonaDependiente from "../components/PersonaDependiente";
import Auxiliar from "../components/Auxiliar";
import {Touchable} from "react-native-web";
import AuxiliarAsignado from "../components/AuxiliarAsignado";

const AuxiliaresAsignados = ({id}) => {

    const navigation = useNavigation()
    const [listOfAuxiliaresAsignados, setListOfAuxiliaresAsignados] = useState([]);
    const isFocused = useIsFocused();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/userPersonaDependiente/list/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setListOfAuxiliaresAsignados(response.data)
            }).catch((e) => console.log(e))

    }, [isFocused]);

    const deleteUserPersonaDependiente = async (auxiliarId, id) => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.delete("http://192.168.1.220:3001/userPersonaDependiente/delete",
            {headers: {accessToken: token},
                data: {
                    userId: auxiliarId,
                    personaDependienteId: id
                }})
            .then(() => {
                setListOfAuxiliaresAsignados(
                    listOfAuxiliaresAsignados.filter((auxiliar) => {
                        return auxiliar.id != auxiliarId;
                    })
                )
            })
    }
    const renderItem = ({item}) => {
        return <View style={styles.global}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("ShowAuxiliar", {id: item.id})}>
                <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUserPersonaDependiente(item.id, id)}>
                <Text style={styles.itemTitle}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <Layout>
            <Text>Auxiliares asignados</Text>
            <TouchableOpacity style={styles.asignarAuxiliarButton} onPress={() => navigation.navigate("AuxiliaresDisponibles", {id: id})}>
                <Text style={styles.itemTitle}>Asignar auxiliar</Text>
            </TouchableOpacity>
            <FlatList
                style={{
                    width: '90%',
                    marginVertical: '5%',
                }}
                data={listOfAuxiliaresAsignados}
                renderItem={renderItem}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContainer: {
        width: '70%',
        backgroundColor: "#005A9C",
        marginBottom: '5%',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        elevation: 3,
    },
    itemTitle: {
        color: "#ffffff",
    },
    asignarAuxiliarButton: {
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
    deleteButton: {
        backgroundColor: '#FF0000',
        marginBottom: '5%',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        elevation: 3
    }

})

export default AuxiliaresAsignados;
