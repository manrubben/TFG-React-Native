import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuxiliarAsignado = ({item, id}) => {

    //Este archivo no se usa


    const [listOfAuxiliaresAsignados, setListOfAuxiliaresAsignados] = useState([]);
    const navigation = useNavigation();

    const deleteUserPersonaDependiente = async (auxiliarId, id) => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.delete("http://192.168.1.220:3001/userPersonaDependiente/delete",
            {headers: {accessToken: token},
                data: {
                    userId: auxiliarId,
                    personaDependienteId: id
                }})
            .then((response) => {
                if(response.data.error) {
                    console.log(response.data.error)
                } else {
                    navigation.isFocused()
                }
            })

    }


    return(
        <View style={styles.global}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("ShowAuxiliar", {id: item.id})}>
                <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUserPersonaDependiente(item.id, id)}>
                <Text style={styles.itemTitle}>Eliminar</Text>
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
    deleteButton: {
        backgroundColor: '#FF0000',
        marginBottom: '5%',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        elevation: 3
    }
});

export default AuxiliarAsignado;
