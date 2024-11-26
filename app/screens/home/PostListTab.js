import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import JobPostCard from "../../components/card/JobPostCard";
import EmptyCard from "../../components/card/EmptyCard";
import OverlayLoading from "../../components/loaders/OverlayLoading";

import { getJobPostById } from "../../services/jobPostService";
import { getJobPostsByRecruiter } from "../../services/jobPostService";
import { getAllJobAppliedByPostId } from "../../services/jobApplyService";

const ITEMS_PER_PAGE = 5;

const PostListTab = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // // Mock data cho danh sách bài đăng
    // const jobPosts = [
    //     // {
    //     //     id: 1,
    //     //     title: "Lập trình viên React Native (lương tháng 20 củ , trợ cấp đầy đủ, lương tháng 13, bảo hiểm đầy đủ)",
    //     //     jobPosition: "React Native Developer",
    //     //     expiryDate: "2024-12-01",
    //     //     jobApplyCount: 12,
    //     //     company: {
    //     //         name: "Công ty Công nghệ ABC",
    //     //         logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp", // URL logo công ty
    //     //     },
    //     //     salary: "15tr - 20tr",
    //     //     remote: "Làm việc kết hợp",
    //     //     type: "Toàn thời gian",
    //     //     quantity: 3,
    //     //     description: "Phát triển ứng dụng di động sử dụng React Native. Thực hiện bảo trì và nâng cấp sản phẩm.",
    //     //     requirements: "Tối thiểu 1 năm kinh nghiệm với React Native. Thành thạo JavaScript, hiểu biết về REST API.",
    //     //     benefits: "Lương thưởng hấp dẫn, chế độ BHXH đầy đủ, cơ hội đào tạo và thăng tiến.",
    //     //     address: "123 Đường ABC, Quận 1, TP.HCM",
    //     // },
    //     // {
    //     //     id: 2,
    //     //     title: "Nhân viên kinh doanh",
    //     //     jobPosition: "Sales Executive",
    //     //     expiryDate: "2024-11-30",
    //     //     jobApplyCount: 8,
    //     //     company: {
    //     //         name: "Công ty Thương mại XYZ",
    //     //         logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp",
    //     //     },
    //     //     salary: "Thỏa thuận",
    //     //     remote: "Làm việc tại văn phòng",
    //     //     type: "Toàn thời gian",
    //     //     quantity: 5,
    //     //     description: "Tìm kiếm khách hàng tiềm năng, tư vấn và giới thiệu sản phẩm của công ty.",
    //     //     requirements:
    //     //         "Kỹ năng giao tiếp tốt, yêu thích kinh doanh, có kinh nghiệm trong lĩnh vực bán hàng là một lợi thế.",
    //     //     benefits: "Hoa hồng theo doanh số, môi trường làm việc năng động, cơ hội thăng tiến.",
    //     //     address: "456 Đường DEF, Quận 3, TP.HCM",
    //     // },
    //     // {
    //     //     id: 3,
    //     //     title: "Chuyên viên nhân sự",
    //     //     jobPosition: "HR Specialist",
    //     //     expiryDate: "2024-12-10",
    //     //     jobApplyCount: 5,
    //     //     company: {
    //     //         name: "Công ty Tài chính KLM",
    //     //         logo: "https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg.webp",
    //     //     },
    //     //     salary: "12tr - 15tr",
    //     //     remote: "Làm việc tại văn phòng",
    //     //     type: "Toàn thời gian",
    //     //     quantity: 2,
    //     //     description: "Quản lý quy trình tuyển dụng, đào tạo và phát triển nhân viên.",
    //     //     requirements: "Kinh nghiệm 2 năm trong lĩnh vực nhân sự, kỹ năng quản lý và giao tiếp tốt.",
    //     //     benefits: "Chế độ bảo hiểm đầy đủ, thưởng lễ tết, nghỉ phép theo quy định.",
    //     //     address: "789 Đường GHI, Quận 7, TP.HCM",
    //     // },
    // ];

    // Tối ưu lại loadData
    const loadData = useCallback(async (newPage = 1, isRefresh = false) => {
        try {
            if (newPage === 1 && !isRefresh) {
                setLoading(true);
            }

            const data = await getJobPostsByRecruiter(newPage, ITEMS_PER_PAGE);

            if (data.success) {
                setTotalElements(data.pageInfo.totalElements);

                if (newPage === 1) {
                    setJobPosts(data.result);
                } else {
                    setJobPosts((prev) => [...prev, ...data.result]);
                }

                setHasMoreData(data.result.length === ITEMS_PER_PAGE);
            } else {
                Alert.alert("Lỗi", data.message);
            }
        } catch (error) {
            console.error("Load data error:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách việc làm");
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
            setIsRefreshing(false);
        }
    }, []);

    const handleViewApplicants = async (jobPostId) => {
        const data = await getAllJobAppliedByPostId(jobPostId);
        navigation.navigate("JobApplications", {
            applicants: data.result,
        });
    };

    const handleViewDetails = async (jobPostId) => {
        const data = await getJobPostById(jobPostId);
        navigation.navigate("JobPostDetail", { job: data.result });
    };

    // Focus effect
    useFocusEffect(
        useCallback(() => {
            setPage(1);
            loadData(1);
        }, [loadData])
    );

    // Refresh handler
    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setPage(1);
        loadData(1, true);
    }, [loadData]);

    // Load more handler
    const handleLoadMore = useCallback(() => {
        if (!isFetchingMore && hasMoreData && !loading) {
            setIsFetchingMore(true);
            setPage((prev) => {
                const newPage = prev + 1;
                loadData(newPage);
                return newPage;
            });
        }
    }, [isFetchingMore, hasMoreData, loading, loadData]);

    // Render methods
    const renderJobItem = useCallback(
        ({ item }) => (
            <JobPostCard
                job={item}
                onViewApplicants={() => handleViewApplicants(item.id)}
                onViewDetails={() => handleViewDetails(item.id)}
            />
        ),
        [navigation]
    );

    const renderFooter = useCallback(() => {
        if (!isFetchingMore) return null;
        return (
            <View className="py-2">
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }, [isFetchingMore]);

    const renderLoader = useCallback(() => <OverlayLoading />, []);

    return (
        <View className="flex-1 bg-gray-100 ">
            <StatusBar style="auto" />
            {loading && renderLoader()}

            <View className="flex-row justify-between items-center my-2">
                <Text className="text-lg font-bold text-gray-800 ml-5">{totalElements} Bài đăng tuyển dụng </Text>
            </View>

            {/* Nội dung tab */}
            {jobPosts.length > 0 ? (
                <View className="flex-1 px-5">
                    <FlatList
                        data={jobPosts}
                        renderItem={renderJobItem}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={5}
                        windowSize={10}
                    />
                </View>
            ) : (
                <View className="h-[600px]">
                    <EmptyCard />
                </View>
            )}

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
