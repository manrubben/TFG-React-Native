import React, {useEffect, useState} from 'react'
import {View, Text, FlatList} from 'react-native'
import axios from "axios";

const GestionarPersonasDependientes = () => {

    const [lista, setLista] = useState([])

    useEffect(async () => {
        await axios.get('http://192.168.1.220:3001/personasDependientes',
            {headers: {accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb3JkaW5hZG9yMSIsImlkIjozLCJyb2wiOiJDT09SRElOQURPUiIsImlhdCI6MTY1MDkwOTE4OX0.2MuSWCBvFivDmm92Z_FuySsQqzFzAdbA2E3I-KU-tc8"}})
            .then((response) => {
                setLista(response.data)
            })
    }, [])

    return (
        <View>
            <FlatList
                data={lista}
                renderItem={({item}) => (
                    <Text>{item.nombre}</Text>
                )}
            />
        </View>
    )
}

export default GestionarPersonasDependientes;
