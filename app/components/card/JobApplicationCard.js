import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../utils/dateUtil";

const JobApplicationCard = ({ application, onViewCV }) => {
    return (
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* Thông tin ứng viên */}
            <Text className="text-lg font-bold text-gray-800 mb-2">{application.name}</Text>

            {/* Ngày ứng tuyển */}
            <Text className="text-sm text-gray-600 mb-2">Ngày ứng tuyển: {formatDate(application.applyDate)}</Text>

            {/* Thư giới thiệu */}
            <Text className="text-sm text-gray-700 mb-4">Thư giới thiệu: {application.coverLetter}</Text>

            {/* Nút xem CV */}
            <TouchableOpacity className="flex-row items-center space-x-2  " onPress={onViewCV}>
                <Ionicons name="document-text-outline" size={24} color="#22c55e" />
                <Text className="text-green-600 font-semibold text-base">Xem CV</Text>
            </TouchableOpacity>
        </View>
    );
};

export default JobApplicationCard;
