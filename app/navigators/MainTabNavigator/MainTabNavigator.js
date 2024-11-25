import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

import HomeTab from "../../screens/home/HomeTab";
import PostListTab from "../../screens/home/PostListTab";
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
                        case "PostListTab":
                            iconName = focused ? "list" : "list-outline";
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
            <Tab.Screen
                name="PostListTab"
                component={PostListTab}
                options={{
                    tabBarLabel: "Bài đăng",
                    headerShown: true,
                    headerTitle: "Danh sách bài đăng",
                    headerStyle: {
                        backgroundColor: "#16a34a",
                    },
                    headerTintColor: "#fff",
                }}
            />
            <Tab.Screen name="AccountTab" component={AccountTab} options={{ tabBarLabel: "Tài Khoản" }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
