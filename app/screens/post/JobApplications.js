import React from "react";
import { View, ScrollView, Linking, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import EmptyCard from "../../components/card/EmptyCard";
import JobApplicationCard from "../../components/card/JobApplicationCard";

const JobApplications = ({ route }) => {
    const { applicants } = route.params;

    const handleViewCV = async (cv) => {
        try {
            const supported = await Linking.canOpenURL(cv);

            if (supported) {
                await Linking.openURL(cv);
            } else {
                Alert.alert("Lỗi", "Không thể mở file CV");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể mở file CV");
            console.error(error);
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            <ScrollView className="p-4">
                {applicants && applicants.length > 0 ? (
                    applicants.map((applicant) => (
                        <JobApplicationCard key={applicant.id} application={applicant} onViewCV={handleViewCV} />
                    ))
                ) : (
                    <View className="h-[600px]">
                        <EmptyCard />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default JobApplications;
