import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import Layout from "./Layout";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FamiliaresAsignados = ({id}) => {

    const navigation = useNavigation()
    const [listOfFamiliaresAsignados, setListOfFamiliaresAsignados] = useState([])
    const isFocused = useIsFocused();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/userPersonaDependiente/familiares/list/${id}`,
            {headers: {accessToken: token}})
            .then((response) => {
                setListOfFamiliaresAsignados(response.data)
            }).catch((e) => console.log(e))
    }, [isFocused])

    const deleteUserPersonaDependiente = async (familiarId, id) => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.delete("http://192.168.1.220:3001/userPersonaDependiente/delete",
            {headers: {accessToken: token},
                data: {
                    userId: familiarId,
                    personaDependienteId: id
                }})
            .then(() => {
                setListOfFamiliaresAsignados(
                    listOfFamiliaresAsignados.filter((familiar) => {
                        return familiar.id != familiarId;
                    })
                )
            }).catch((e) => console.log(e))
    }

    const renderItem = ({item}) => {
        return <View style={styles.global}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("ShowFamiliar", {id: item.id})}>
                <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUserPersonaDependiente(item.id, id)}>
                <Text style={styles.itemTitle}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <Layout>
            <Text>Familiares asignados</Text>
            <TouchableOpacity style={styles.asignarFamiliarButton} onPress={() => navigation.navigate("CreateFamiliar", {id: id})}>
                <Text style={styles.itemTitle}>Asignar familiar</Text>
            </TouchableOpacity>
            <FlatList
                listKey="familiares-asignados"
                style={{
                    width: '90%',
                    marginVertical: '5%',
                }}
                data={listOfFamiliaresAsignados}
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
    asignarFamiliarButton: {
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

export default FamiliaresAsignados;
