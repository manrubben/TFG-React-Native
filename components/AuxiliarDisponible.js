import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuxiliarDisponible = ({item, id}) => {
    const navigation = useNavigation();

    const addAuxiliar = async (userId, personaDependienteId) => {
        const token = await AsyncStorage.getItem("accessToken")
        console.log(userId)
        console.log(personaDependienteId)
        await axios.post("http://192.168.1.220:3001/userPersonaDependiente/addTo",
            {userId: userId, personaDependienteId: personaDependienteId},
            {headers: {accessToken: token}})
            .then(() => {
                navigation.goBack()
            }).catch((e) => console.log(e))
    }

    return (
        <View style={styles.global}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("ShowAuxiliar", {id: item.id})}>
                <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => addAuxiliar(item.id, id)}>
                <Text style={styles.itemTitle}>Asignar</Text>
            </TouchableOpacity>
        </View>
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
    addButton: {
        backgroundColor: '#33FF49',
        marginBottom: '5%',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        elevation: 3
    }
});

export default AuxiliarDisponible;
