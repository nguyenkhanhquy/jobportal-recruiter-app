import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoginForm from "../../components/form/LoginForm/LoginForm";
import bgImage from "../../assets/img/login_background.jpg";
import OverlayLoading from "../../components/loaders/OverlayLoading";

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    return (
        <ImageBackground source={bgImage} resizeMode="cover" className="flex-1">
            <StatusBar style="auto" />
            {loading && <OverlayLoading />}
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <View className="w-full max-w-md">
                    <LoginForm navigation={navigation} setLoading={setLoading} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;
