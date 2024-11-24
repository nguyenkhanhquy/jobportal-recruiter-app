import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import Toast from "react-native-toast-message";

import Intro from "../../screens/intro/Intro";
import Login from "../../screens/auth/Login";
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
            </Stack.Navigator>
            {/* <Toast /> */}
        </NavigationContainer>
    );
};

export default AppNavigator;
