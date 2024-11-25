import React from "react";
import { View, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import EmptyCard from "../../components/card/EmptyCard";
import JobApplicationCard from "../../components/card/JobApplicationCard";

const JobApplications = ({ route }) => {
    const { applicants } = route.params;

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />
            <ScrollView className="p-4">
                {applicants && applicants.length > 0 ? (
                    applicants.map((applicant) => (
                        <JobApplicationCard
                            key={applicant.id}
                            application={applicant}
                            onViewCV={() => console.log(`Xem CV ứng viên ID: ${applicant.id}`)}
                        />
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
