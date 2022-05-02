import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, FlatList, Pressable, TouchableOpacity} from 'react-native'
import axios from "axios";
import PersonaDependiente from "../components/PersonaDependiente";
import Layout from "./Layout";
import { useIsFocused } from "@react-navigation/native";

const GestionarPersonasDependientes = ({navigation}) => {

    const [lista, setLista] = useState([])
    const isFocused = useIsFocused();

    useEffect(async () => {
        await axios.get('http://192.168.1.220:3001/personasDependientes',
            {headers: {accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjozLCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MDkwOTE4OX0.2MuSWCBvFivDmm92Z_FuySsQqzFzAdbA2E3I-KU-tc8"}})
            .then((response) => {
                setLista(response.data)
            })
    }, [isFocused])

    const renderItem = ({item}) => {
        return <PersonaDependiente item={item} />
    }

    return (
        <Layout>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreatePersonaDependiente")}>
                <Text style={styles.text}>Añadir</Text>
            </TouchableOpacity>
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

export default GestionarPersonasDependientes;
