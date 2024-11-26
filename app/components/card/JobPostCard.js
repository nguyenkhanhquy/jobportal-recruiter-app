import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { formatDate } from "../../utils/dateUtil";

const JobPostCard = ({ job, onViewApplicants, onViewDetails }) => {
    return (
        <View className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {/* Tiêu đề */}
            <Text className="text-lg font-bold text-gray-800 mb-1">{job.title}</Text>

            {/* Vị trí công việc */}
            <Text className="text-sm text-gray-600 mb-1">Vị trí: {job.jobPosition}</Text>

            {/* Ngày hết hạn */}
            <Text className="text-sm text-gray-600 mb-4">Hạn nộp: {formatDate(job.expiryDate)}</Text>

            {/* Hồ sơ ứng tuyển */}
            <Text className="text-sm text-gray-600 mb-4">Hồ sơ ứng tuyển: {job.jobApplyCount} ứng viên</Text>

            {/* Các nút */}
            <View className="flex-row gap-2">
                {/* Xem danh sách ứng viên */}
                {job.jobApplyCount > 0 ? (
                    <TouchableOpacity className="bg-green-600 rounded-md px-4 py-2 w-28" onPress={onViewApplicants}>
                        <Text className="text-white font-bold text-sm text-center">Xem hồ sơ</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity disabled className="bg-gray-600 rounded-md px-4 py-2 w-30">
                        <Text className="text-white font-bold text-sm text-center">Chưa có ứng viên</Text>
                    </TouchableOpacity>
                )}

                {/* Chi tiết bài đăng */}
                <TouchableOpacity className="border border-green-600 rounded-md px-4 py-2 w-20" onPress={onViewDetails}>
                    <Text className="text-green-600 font-bold text-sm text-center">Chi tiết</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JobPostCard;
