import React, {useEffect, useState} from 'react'
import {View, Text, FlatList} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import Auxiliar from "../components/Auxiliar";
import AuxiliarDisponible from "../components/AuxiliarDisponible";

const AuxiliaresDisponibles = ({route}) => {

    const [listOfAuxiliaresDisponibles, setListOfAuxiliaresDisponibles] = useState([]);
    const id = route.params.id; //id de la persona dependiente
    const navigation = useNavigation();

    useEffect(async () => {
        const token = await AsyncStorage.getItem("accessToken")
        await axios.get(`http://192.168.1.220:3001/users/personaDependiente/${id}/listAuxiliaresDisponibles`,
            {headers: {accessToken: token}})
            .then((response) => {
                setListOfAuxiliaresDisponibles(response.data);
            }).catch((e) => console.log(e))
    }, [])

    const renderItem = ({item}) => {
        return <AuxiliarDisponible item={item} id={route.params.id} />
    }

    return (
        <Layout>
            <FlatList style={{
                width: '90%',
                marginVertical: '5%'
            }}
                      data={listOfAuxiliaresDisponibles}
                      renderItem={renderItem}
            />
        </Layout>
    )
}

export default AuxiliaresDisponibles;
