import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import OverLoading from "../../components/loaders/OverlayLoading";

import { getAuthProfile, logout } from "../../services/authService";
import { getToken, deleteToken } from "../../utils/authStorage";

const AccountTab = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

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

    const fetchUserInfo = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            if (token) {
                const data = await getAuthProfile();
                if (data.success) {
                    setProfile(data.result);
                } else {
                    Alert.alert("Error", data.message);
                }
            }
        } catch (error) {
            showToast("error", "Không thể lấy thông tin người dùng.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    const handleLogout = async () => {
        Alert.alert(
            "Xác nhận đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Hủy",
                },
                {
                    text: "Đăng xuất",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const token = await getToken();
                            if (token) {
                                const data = await logout(token);

                                if (data.success) {
                                    deleteToken();
                                    setProfile(null);
                                    navigation.navigate("Login");
                                }
                            }
                        } catch (error) {
                            showToast("error", "Đăng xuất thất bại!");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            {loading && <OverLoading />}
            {/* Background Section */}
            <View className="bg-green-600 h-36 w-full absolute top-0 left-0 right-0 z-[-1]" />

            {/* Profile Section */}
            {profile ? (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative">
                            {profile.company.logo ? (
                                <Image
                                    source={{
                                        uri: profile.company.logo,
                                    }}
                                    className="w-24 h-24 rounded-full border-2 border-green-600"
                                />
                            ) : (
                                <View className="w-24 h-24 rounded-full border-2 border-green-600 justify-center items-center">
                                    <Ionicons name="person-outline" size={48} color="#509b43" />
                                </View>
                            )}
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-lg font-bold text-gray-800 mb-1">{profile.name}</Text>
                            <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
                                {profile.email}
                            </Text>
                            {profile.active ? (
                                <View className="flex-row items-center mt-2">
                                    <Octicons
                                        name="shield-check"
                                        size={20}
                                        color="#6dcf5b"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text className="text-sm font-bold text-gray-600">Tài khoản đã xác thực</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ActivateAccount", { email: profile.email });
                                    }}
                                >
                                    <View className="flex-row items-center mt-2">
                                        <Octicons name="shield-x" size={20} color="red" style={{ marginRight: 4 }} />
                                        <Text className="text-sm font-bold text-gray-600">Tài khoản chưa xác thực</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Options Section */}
                    <View className="px-5 mt-10">
                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            onPress={() => navigation.navigate("Profile", { recruiter: profile })}
                        >
                            <Text className="text-lg font-medium text-gray-800">Hồ sơ nhà tuyển dụng</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            onPress={() => navigation.navigate("ChangePassword")}
                        >
                            <Text className="text-lg font-medium text-gray-800">Đổi mật khẩu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg"
                            style={styles.shadowStyle}
                            onPress={handleLogout}
                        >
                            <Text className="text-lg font-medium text-red-600">Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative mr-5">
                            <View className="w-24 h-24 rounded-full border-2 border-green-600 justify-center items-center">
                                <Ionicons name="person-outline" size={48} color="#509b43" />
                            </View>
                        </View>
                        <View className="flex-1 justify-center">
                            <Text className="text-lg font-bold text-gray-800 mb-3 text-center">Vui lòng đăng nhập</Text>
                            <TouchableOpacity
                                className="bg-green-600 p-3 rounded-lg justify-center items-center"
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}
                            >
                                <Text className="text-lg font-medium text-white">Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AccountTab;
