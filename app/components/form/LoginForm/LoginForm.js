import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { emailRegex } from "../../../utils/regex";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import logo from "../../../assets/img/logo.png";

import { login, logout } from "../../../services/authService";
import { handleLoginResponse } from "../../../utils/authStorage";

const LoginForm = ({ navigation, setLoading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setShowPassword(false);
        setEmailError("");
        setPasswordError("");
    };

    useFocusEffect(React.useCallback(() => resetStates(), []));

    const validateInputs = () => {
        let valid = true;
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email không được để trống");
            valid = false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            valid = false;
        }

        if (!password) {
            setPasswordError("Mật khẩu không được để trống");
            valid = false;
        }

        return valid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        try {
            setLoading(true);
            const data = await login(email, password);
            if (data.success) {
                if (data.result.role !== "RECRUITER") {
                    await logout(data.result.token);
                    throw new Error("Quyền tài khoản không hợp lệ!");
                }
                resetStates();
                handleLoginResponse(data);
                navigation.navigate("Home", {
                    screen: "PostListTab",
                });
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full bg-white p-8 rounded-lg shadow-md">
            {/* Logo + for Business */}
            <View className="flex-row items-center justify-center mb-6">
                <Image source={logo} style={{ width: 80, height: 80 }} />
                <Text className="text-2xl font-semibold text-gray-700 ml-2">for Business</Text>
            </View>

            {/* Email Label and Input */}
            <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-2">Email</Text>
                <TextInput
                    placeholder="Nhập email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (!emailRegex.test(text.toLowerCase())) {
                            setEmailError("Email không đúng định dạng");
                        } else {
                            setEmailError("");
                        }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
                />
                {emailError ? <Text className="text-red-500 text-sm mt-1">{emailError}</Text> : null}
            </View>

            {/* Password Label and Input */}
            <View className="mb-8">
                <Text className="text-gray-700 font-medium mb-2">Mật khẩu</Text>
                <View className="flex-row items-center p-3 border border-gray-300 rounded-md">
                    <TextInput
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        className="flex-1 text-gray-700"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text className="text-red-500 text-sm mt-1">{passwordError}</Text> : null}
            </View>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} className="w-full py-3 bg-green-600 rounded-md">
                <Text className="text-center text-white font-bold text-base">Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
