import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { introspect } from "../../services/authService";
import { getToken, deleteToken } from "../../utils/authStorage";

import logo from "../../assets/img/logo.png";

const Intro = ({ navigation }) => {
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                const data = await introspect(token);
                if (data.success) {
                    navigation.replace("Home", {
                        screen: "PostListTab",
                    });
                    return;
                } else {
                    deleteToken();
                }
            }
            navigation.replace("Login");
        };

        const timer = setTimeout(() => {
            checkToken();
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Image source={logo} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default Intro;
