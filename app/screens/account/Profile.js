import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { emailRegex } from "../../utils/regex";

import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { updateProfile } from "../../services/recruiterService";

const Profile = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Thông tin người đại diện
    const [name, setName] = useState(route.params.recruiter.name);
    const [position, setPosition] = useState(route.params.recruiter.position);
    const [recruiterEmail, setRecruiterEmail] = useState(route.params.recruiter.recruiterEmail);
    const [phone, setPhone] = useState(route.params.recruiter.phone);

    // Thông tin công ty
    const [companyName] = useState(route.params.recruiter.company.name); // Không thay đổi
    const [website, setWebsite] = useState(route.params.recruiter.company.website);
    const [companyAddress, setCompanyAddress] = useState(route.params.recruiter.company.address);
    const [description, setDescription] = useState(route.params.recruiter.company.description);

    // Lỗi
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Họ và tên không được để trống";
        if (!position.trim()) newErrors.position = "Chức vụ không được để trống";
        if (!recruiterEmail.trim()) {
            newErrors.recruiterEmail = "Email không được để trống";
        } else if (!emailRegex.test(recruiterEmail.toLowerCase())) {
            newErrors.recruiterEmail = "Email không hợp lệ";
        }
        if (!phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
        if (!companyAddress.trim()) newErrors.companyAddress = "Địa chỉ công ty không được để trống";
        if (!description.trim()) newErrors.description = "Giới thiệu công ty không được để trống";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (validate()) {
            try {
                setLoading(true);

                const body = {
                    name,
                    position,
                    recruiterEmail,
                    phone,
                    website,
                    description,
                    companyAddress,
                    companyLogo: route.params.recruiter.company.logo,
                };

                const data = await updateProfile(body);

                if (data.success) {
                    showToast("success", data.message);
                    navigation.goBack();
                } else {
                    throw new Error(data.message || "Lỗi máy chủ, vui lòng thử lại sau!");
                }
            } catch (error) {
                showToast("error", error.message);
            } finally {
                setLoading(false);
            }
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
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />

            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    <View
                        style={{
                            width: 68,
                            height: 68,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                    >
                        <ActivityIndicator size="large" color="#6dcf5b" />
                    </View>
                </View>
            )}

            {/* Form Section */}
            <ScrollView className="flex-1 px-6">
                {/* Thông tin người đại diện */}
                <Text className="text-xl font-bold mb-4 mt-4 text-green-600">Thông tin người đại diện</Text>

                <Text className="text-base font-bold mb-2">Họ và tên</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập họ và tên"
                        placeholderTextColor="#a0a0a0"
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                {errors.name && <Text className="text-red-500 mb-4">{errors.name}</Text>}

                <Text className="text-base font-bold mb-2">Chức vụ</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập chức vụ"
                        placeholderTextColor="#a0a0a0"
                        value={position}
                        onChangeText={(value) => setPosition(value)}
                    />
                </View>
                {errors.position && <Text className="text-red-500 mb-4">{errors.position}</Text>}

                <Text className="text-base font-bold mb-2">Email người đại diện</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập email"
                        placeholderTextColor="#a0a0a0"
                        value={recruiterEmail}
                        onChangeText={(value) => setRecruiterEmail(value)}
                    />
                </View>
                {errors.recruiterEmail && <Text className="text-red-500 mb-4">{errors.recruiterEmail}</Text>}

                <Text className="text-base font-bold mb-2">Số điện thoại</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập số điện thoại"
                        placeholderTextColor="#a0a0a0"
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                    />
                </View>
                {errors.phone && <Text className="text-red-500 mb-4">{errors.phone}</Text>}

                {/* Thông tin công ty */}
                <Text className="text-xl font-bold mb-4 text-green-600">Thông tin công ty</Text>

                <Text className="text-base font-bold mb-2">Tên công ty</Text>
                <View className="bg-gray-200 rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Tên công ty"
                        placeholderTextColor="#a0a0a0"
                        value={companyName}
                        multiline={true}
                        editable={false}
                    />
                </View>

                <Text className="text-base font-bold mb-2">Website</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập website"
                        placeholderTextColor="#a0a0a0"
                        value={website}
                        onChangeText={(value) => setWebsite(value)}
                    />
                </View>

                <Text className="text-base font-bold mb-2">Địa chỉ công ty</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập địa chỉ công ty"
                        placeholderTextColor="#a0a0a0"
                        value={companyAddress}
                        multiline={true}
                        onChangeText={(value) => setCompanyAddress(value)}
                    />
                </View>
                {errors.companyAddress && <Text className="text-red-500 mb-4">{errors.companyAddress}</Text>}

                <Text className="text-base font-bold mb-2">Giới thiệu công ty</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập giới thiệu công ty"
                        placeholderTextColor="#a0a0a0"
                        value={description}
                        multiline={true}
                        onChangeText={(value) => setDescription(value)}
                    />
                </View>
                {errors.description && <Text className="text-red-500 mb-4">{errors.description}</Text>}
                {/* Button Section */}
                <View className=" py-3 ">
                    <TouchableOpacity className="bg-green-600 rounded-full py-3" onPress={handleSave}>
                        <Text className="text-white text-center font-bold text-base">Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
