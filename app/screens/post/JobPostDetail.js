import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";

// import { getToken } from "../../utils/authStorage";
import { formatDate } from "../../utils/dateUtil";

const JobPostDetail = ({ route, navigation }) => {
    const { job } = route.params;

    const getExpiryStatus = (expiryDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setDate(today.getDate() + 1);
        const expiry = new Date(expiryDate);

        // Tính số ngày còn lại
        const daysRemaining = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (daysRemaining < 0) {
            return true;
        }
        return false;
    };

    const handleUpdate = () => {
        navigation.navigate("UpdateJobPost", { job }); // Truyền dữ liệu job sang trang chỉnh sửa
    };

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />

            <ScrollView className="p-4">
                <View
                    className="bg-white rounded-xl p-5 mt-14 mb-5 ml-0.5 mr-0.5 relative"
                    style={{
                        elevation: 1,
                    }}
                >
                    {/* Logo */}
                    <View
                        className="absolute top-[-50px] left-[41%] z-10 bg-white rounded-xl"
                        style={{
                            elevation: 1,
                        }}
                    >
                        <Image source={{ uri: job.company.logo }} className="w-24 h-24 rounded-xl" />
                    </View>

                    {/* Job Info */}
                    <View className="mt-12 items-center">
                        <Text className="text-xl font-bold text-gray-900 text-center">{job.title}</Text>
                        <Text className="text-lg text-gray-600 text-center mt-2">{job.company.name}</Text>

                        <View className="flex-row justify-around w-full mt-4">
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Mức lương</Text>
                                <Text className="text-base text-green-600 mt-1">{job.salary}</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Loại hình</Text>
                                <Text className="text-base text-green-600 mt-1">
                                    {job.remote === "Làm việc kết hợp" ? "Kết hợp" : job.remote}
                                </Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-sm font-bold text-gray-600">Loại hợp đồng</Text>
                                <Text className="text-base text-green-600 mt-1">{job.type}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Job Description */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Thông tin chung</Text>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Vị trí tuyển dụng:</Text>
                        <Text className="text-base text-gray-600">{job.jobPosition}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Số lượng tuyển:</Text>
                        <Text className="text-base text-gray-600">{job.quantity}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-bold text-gray-700">Hạn nộp hồ sơ:</Text>
                        <Text className="text-base text-gray-600">{formatDate(job.expiryDate)}</Text>
                    </View>
                </View>

                {/* Job Details Sections */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Mô tả công việc</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.description}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Yêu cầu ứng viên</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.requirements}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Quyền lợi</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.benefits}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Địa chỉ làm việc</Text>
                    <Text className="text-base text-gray-600 leading-6">{job.address}</Text>
                </View>
            </ScrollView>

            {/* Apply Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-1 border-t border-gray-200">
                <TouchableOpacity onPress={handleUpdate} className="bg-green-600 py-3 rounded-lg items-center">
                    <Text className="text-white text-lg font-bold">Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JobPostDetail;
