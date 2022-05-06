import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Familiar = ({item}) => {
    const navigation = useNavigation();
    return(
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("ShowFamiliar", {id: item.id})}>
                <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#005A9C",
        padding: 20,
        marginVertical: 8,
        alignItems: "center",
        borderRadius: 5,
    },
    itemTitle: {
        color: "#ffffff",
    },
});

export default Familiar;
