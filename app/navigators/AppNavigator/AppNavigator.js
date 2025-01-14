import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Toast from "react-native-toast-message";

import Intro from "../../screens/intro/Intro";
import Login from "../../screens/auth/Login";
import ChangePassword from "../../screens/account/ChangePassword";
import Profile from "../../screens/account/Profile";
import CreateJobPost from "../../screens/post/CreateJobPost";
import JobPostDetail from "../../screens/post/JobPostDetail";
import UpdateJobPost from "../../screens/post/UpdateJobPost";
import JobApplications from "../../screens/post/JobApplications";
import MainTabNavigator from "../MainTabNavigator/MainTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={MainTabNavigator} />
                <Stack.Screen
                    name="CreateJobPost"
                    component={CreateJobPost}
                    options={{ headerShown: true, headerTitle: "Tạo bài đăng", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="JobPostDetail"
                    component={JobPostDetail}
                    options={{ headerShown: true, headerTitle: "Chi tiết bài đăng", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="UpdateJobPost"
                    component={UpdateJobPost}
                    options={{ headerShown: true, headerTitle: "Chỉnh sửa bài đăng", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="JobApplications"
                    component={JobApplications}
                    options={{ headerShown: true, headerTitle: "Danh sách ứng viên", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{ headerShown: true, headerTitle: "Đổi mật khẩu", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: true, headerTitle: "Hồ sơ nhà tuyển dụng", headerTitleAlign: "center" }}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default AppNavigator;
