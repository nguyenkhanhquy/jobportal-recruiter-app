import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import JobPostCard from "../../components/card/JobPostCard";

const PostListTab = ({ navigation }) => {
    // Mock data cho danh sách bài đăng
    const jobPosts = [
        {
            id: 1,
            title: "Lập trình viên React Native",
            jobPosition: "React Native Developer",
            expiryDate: "2024-12-01",
            jobApplyCount: 12,
        },
        {
            id: 2,
            title: "Nhân viên kinh doanh",
            jobPosition: "Sales Executive",
            expiryDate: "2024-11-30",
            jobApplyCount: 8,
        },
        {
            id: 3,
            title: "Chuyên viên nhân sự",
            jobPosition: "HR Specialist",
            expiryDate: "2024-12-10",
            jobApplyCount: 5,
        },
        {
            id: 4,
            title: "Nhân viên kinh doanh",
            jobPosition: "Sales Executive",
            expiryDate: "2024-11-30",
            jobApplyCount: 8,
        },
    ];

    const handleViewApplicants = (jobId) => {
        console.log(`Xem danh sách ứng viên cho job ID: ${jobId}`);
    };

    const handleViewDetails = (jobId) => {
        console.log(`Xem chi tiết bài đăng cho job ID: ${jobId}`);
    };

    return (
        <View className="flex-1 bg-gray-100 ">
            <StatusBar style="auto" />
            {/* Nội dung tab */}
            <ScrollView className="flex-1 p-4">
                {jobPosts.map((job) => (
                    <JobPostCard
                        key={job.id}
                        job={job}
                        onViewApplicants={() => handleViewApplicants(job.id)}
                        onViewDetails={() => handleViewDetails(job.id)}
                    />
                ))}
            </ScrollView>

            {/* Button cố định */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-green-600 border border-white rounded-full p-4 shadow-lg"
                onPress={() => navigation.navigate("CreateJobPost")}
            >
                <Ionicons name="create" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default PostListTab;
