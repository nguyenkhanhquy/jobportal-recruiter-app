import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AccountTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AccountTab</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eafaf1",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#6dcf5b",
        marginBottom: 30,
        textAlign: "center",
    },
});

export default AccountTab;
