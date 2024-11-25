import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import JobPostCard from "../../components/card/JobPostCard";
import EmptyCard from "../../components/card/EmptyCard";

const PostListTab = ({ navigation }) => {
    // Mock data cho danh sách bài đăng
    const jobPosts = [
        {
            id: 1,
            title: "Lập trình viên React Native (lương tháng 20 củ , trợ cấp đầy đủ, lương tháng 13, bảo hiểm đầy đủ)",
            jobPosition: "React Native Developer",
            expiryDate: "2024-12-01",
            jobApplyCount: 12,
            company: {
                name: "Công ty Công nghệ ABC",
                logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp", // URL logo công ty
            },
            salary: "15tr - 20tr",
            remote: "Làm việc kết hợp",
            type: "Toàn thời gian",
            quantity: 3,
            description: "Phát triển ứng dụng di động sử dụng React Native. Thực hiện bảo trì và nâng cấp sản phẩm.",
            requirements: "Tối thiểu 1 năm kinh nghiệm với React Native. Thành thạo JavaScript, hiểu biết về REST API.",
            benefits: "Lương thưởng hấp dẫn, chế độ BHXH đầy đủ, cơ hội đào tạo và thăng tiến.",
            address: "123 Đường ABC, Quận 1, TP.HCM",
        },
        {
            id: 2,
            title: "Nhân viên kinh doanh",
            jobPosition: "Sales Executive",
            expiryDate: "2024-11-30",
            jobApplyCount: 8,
            company: {
                name: "Công ty Thương mại XYZ",
                logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp",
            },
            salary: "Thỏa thuận",
            remote: "Làm việc tại văn phòng",
            type: "Toàn thời gian",
            quantity: 5,
            description: "Tìm kiếm khách hàng tiềm năng, tư vấn và giới thiệu sản phẩm của công ty.",
            requirements:
                "Kỹ năng giao tiếp tốt, yêu thích kinh doanh, có kinh nghiệm trong lĩnh vực bán hàng là một lợi thế.",
            benefits: "Hoa hồng theo doanh số, môi trường làm việc năng động, cơ hội thăng tiến.",
            address: "456 Đường DEF, Quận 3, TP.HCM",
        },
        {
            id: 3,
            title: "Chuyên viên nhân sự",
            jobPosition: "HR Specialist",
            expiryDate: "2024-12-10",
            jobApplyCount: 5,
            company: {
                name: "Công ty Tài chính KLM",
                logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp",
            },
            salary: "12tr - 15tr",
            remote: "Làm việc tại văn phòng",
            type: "Toàn thời gian",
            quantity: 2,
            description: "Quản lý quy trình tuyển dụng, đào tạo và phát triển nhân viên.",
            requirements: "Kinh nghiệm 2 năm trong lĩnh vực nhân sự, kỹ năng quản lý và giao tiếp tốt.",
            benefits: "Chế độ bảo hiểm đầy đủ, thưởng lễ tết, nghỉ phép theo quy định.",
            address: "789 Đường GHI, Quận 7, TP.HCM",
        },
    ];

    const handleViewApplicants = (jobId) => {
        console.log(`Xem danh sách ứng viên cho job ID: ${jobId}`);
    };

    const handleViewDetails = (job) => {
        navigation.navigate("JobPostDetail", { job });
    };

    return (
        <View className="flex-1 bg-gray-100 ">
            <StatusBar style="auto" />
            {/* Nội dung tab */}
            <ScrollView className="flex-1 p-4">
                {jobPosts.length > 0 ? (
                    jobPosts.map((job) => (
                        <JobPostCard
                            key={job.id}
                            job={job}
                            onViewApplicants={() => handleViewApplicants(job.id)}
                            onViewDetails={() => handleViewDetails(job)}
                        />
                    ))
                ) : (
                    <View className="h-[600px]">
                        <EmptyCard />
                    </View>
                )}
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
