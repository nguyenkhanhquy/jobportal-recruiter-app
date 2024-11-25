import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const PostListTab = ({ navigation }) => {
    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            {/* Nội dung tab */}
            <ScrollView className="flex-1 p-4">
                <Text>Danh sách bài đăng sẽ hiển thị ở đây.</Text>
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
