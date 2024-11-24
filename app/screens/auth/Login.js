import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoginForm from "../../components/form/LoginForm/LoginForm";
import bgImage from "../../assets/img/login_background.jpg";

const Login = ({ navigation }) => {
    return (
        <ImageBackground source={bgImage} resizeMode="cover" className="flex-1">
            <StatusBar style="auto" />
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <View className="w-full max-w-md">
                    <LoginForm onLoginSuccess={() => navigation.navigate("Home", { screen: "HomeTab" })} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;
