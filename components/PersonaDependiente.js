import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PersonaDependiente = ({item}) => {
    return(
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.nombre + " " + item.apellidos}</Text>
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

export default PersonaDependiente;
