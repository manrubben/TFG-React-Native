import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {useIsFocused, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Familiar from "../components/Familiar";
import Layout from "./Layout";

const GestionarFamiliares = () => {

    const [lista, setLista] = useState([])
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get('http://192.168.1.220:3001/users/familiares/list',
            {headers: {accessToken: token}})
            .then((response) => {
                setLista(response.data)
            }).catch((e) => console.log(e))
    }, [isFocused])

    const renderItem = ({item}) => {
        return <Familiar item={item} />
    }

    return (
        <Layout>
            <FlatList style={{
                width: '90%',
                marginVertical: '5%'
            }}
                      data={lista}
                      renderItem={renderItem}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#33FF49',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default GestionarFamiliares;
