import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { updatePassword, logout } from "../../services/authService";
import { getToken, deleteToken } from "../../utils/authStorage";

const ChangePassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validatePassword = (value) => {
        if (value.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu hiện tại");
        } else {
            setPasswordError("");
        }
        setPassword(value);
    };

    const validateNewPassword = (value) => {
        if (value.trim() === "") {
            setNewPasswordError("Vui lòng nhập mật khẩu mới");
        } else if (value.length < 8) {
            setNewPasswordError("Mật khẩu mới phải có ít nhất 8 ký tự");
        } else {
            setNewPasswordError("");
        }
        setNewPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (value.trim() === "") {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu mới");
        } else if (newPassword !== value) {
            setConfirmPasswordError("Nhập lại mật khẩu không trùng khớp");
        } else {
            setConfirmPasswordError("");
        }
        setConfirmPassword(value);
    };

    const validateInputs = () => {
        let isValid = true;

        if (password.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu hiện tại");
            isValid = false;
        }
        if (newPassword.trim() === "") {
            setNewPasswordError("Vui lòng nhập mật khẩu mới");
            isValid = false;
        }
        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu mới");
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Nhập lại mật khẩu không trùng khớp");
            isValid = false;
        }

        return isValid;
    };

    const handleSave = async () => {
        if (!validateInputs()) {
            return;
        }

        setLoading(true);
        try {
            const data = await updatePassword(password, newPassword);
            if (data.success) {
                showToast("success", data.message);
                try {
                    const token = await getToken();
                    if (token) {
                        const data = await logout(token);
                        if (data.success) {
                            deleteToken();
                            showToast("info", "Vui lòng đăng nhập lại");
                            navigation.navigate("Login");
                        }
                    }
                } catch (error) {
                    showToast("error", "Đăng xuất thất bại");
                }
            } else {
                throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
            }
        } catch (error) {
            showToast("error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

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

    return (
        <View className="flex-1 bg-[#f1f4f9] justify-between">
            <StatusBar style="auto" />

            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Làm mờ phần nền xung quanh một chút
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    {/* Hình vuông chứa ActivityIndicator */}
                    <View
                        style={{
                            width: 68, // Kích thước của hình vuông
                            height: 68,
                            backgroundColor: "#fff", // Màu nền trắng cho hình vuông
                            borderRadius: 10, // Bo góc cho hình vuông
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5, // Hiệu ứng đổ bóng cho Android
                        }}
                    >
                        <ActivityIndicator size="large" color="#6dcf5b" />
                    </View>
                </View>
            )}

            <View className="bg-white px-3 py-5 mx-4 my-4">
                <Text className="text-lg font-bold text-[#333] mb-2">Mật khẩu hiện tại</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Mật khẩu hiện tại"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={password}
                        onChangeText={validatePassword}
                    />
                </View>
                {passwordError ? <Text className="text-red-500 mb-2 text-sm">{passwordError}</Text> : null}

                <Text className="text-lg font-bold text-[#333] mb-2">Mật khẩu mới</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={validateNewPassword}
                    />
                </View>
                {newPasswordError ? <Text className="text-red-500 mb-2 text-sm">{newPasswordError}</Text> : null}

                <Text className="text-lg font-bold text-[#333] mb-2">Nhập lại mật khẩu mới</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={validateConfirmPassword}
                    />
                </View>
                {confirmPasswordError ? (
                    <Text className="text-red-500 mb-2 text-sm">{confirmPasswordError}</Text>
                ) : null}
            </View>

            <View className="flex-row justify-between bg-white py-3 px-2">
                <TouchableOpacity
                    className="border border-green-600 rounded-full py-3 px-4 w-[49%]"
                    onPress={handleCancel}
                >
                    <Text className="text-green-600 text-center font-bold text-base">Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-green-600 rounded-full py-3 px-4 w-[49%]" onPress={handleSave}>
                    <Text className="text-white text-center font-bold text-base">Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;
