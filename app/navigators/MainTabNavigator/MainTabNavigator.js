import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

import HomeTab from "../../screens/home/HomeTab";
import CreateJobTab from "../../screens/home/CreateJobPostTab";
import AccountTab from "../../screens/home/AccountTab";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "HomeTab":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "CreateJobTab":
                            iconName = focused ? "create" : "create-outline";
                            break;
                        case "AccountTab":
                            iconName = focused ? "person" : "person-outline";
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#16a34a",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} options={{ tabBarLabel: "Trang chủ" }} />
            <Tab.Screen name="CreateJobTab" component={CreateJobTab} options={{ tabBarLabel: "Tạo bài đăng" }} />
            <Tab.Screen name="AccountTab" component={AccountTab} options={{ tabBarLabel: "Tài Khoản" }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
