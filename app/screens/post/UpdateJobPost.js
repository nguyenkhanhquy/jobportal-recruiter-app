import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, convertDate } from "../../utils/dateUtil";
import Toast from "react-native-toast-message";
import OverlayLoading from "../../components/loaders/OverlayLoading";

import { updateJobPost } from "../../services/jobPostService";

const UpdateJobPost = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { job } = route.params; // Nhận dữ liệu job từ route

    // Trạng thái lưu giá trị các trường
    const [title, setTitle] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("");
    const [remote, setRemote] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [benefits, setBenefits] = useState("");
    const [address, setAddress] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Trạng thái lưu lỗi
    const [errors, setErrors] = useState({});

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    // Gán dữ liệu job vào các state khi component được render
    useEffect(() => {
        if (job) {
            setTitle(job.title || "");
            setJobPosition(job.jobPosition || "");
            setSalary(job.salary || "");
            setQuantity(job.quantity?.toString() || "");
            setType(job.type || "");
            setRemote(job.remote || "");
            setDescription(job.description || "");
            setRequirements(job.requirements || "");
            setBenefits(job.benefits || "");
            setAddress(job.address || "");
            setExpiryDate(job.expiryDate || "");
        }
    }, [job]);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setExpiryDate(convertDate(selectedDate)); // Lưu định dạng yyyy-mm-dd
        }
    };

    // Hàm validate
    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
        else if (title.length > 150) newErrors.title = "Tiêu đề không được vượt quá 150 ký tự";

        if (!jobPosition.trim()) newErrors.jobPosition = "Vui lòng nhập vị trí tuyển dụng";
        else if (jobPosition.length > 100) newErrors.jobPosition = "Không được vượt quá 100 ký tự";

        if (!salary.trim()) newErrors.salary = "Vui lòng nhập mức lương";
        else if (salary.length > 100) newErrors.salary = "Không được vượt quá 100 ký tự";

        if (!quantity.trim()) newErrors.quantity = "Vui lòng nhập số lượng tuyển dụng";
        else if (isNaN(quantity) || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0)
            newErrors.quantity = "Số lượng phải là số nguyên dương";

        if (!type) newErrors.type = "Vui lòng chọn loại hợp đồng";

        if (!remote) newErrors.remote = "Vui lòng chọn hình thức làm việc";

        if (!description.trim()) newErrors.description = "Vui lòng nhập mô tả công việc";

        if (!requirements.trim()) newErrors.requirements = "Vui lòng nhập yêu cầu ứng viên";

        if (!benefits.trim()) newErrors.benefits = "Vui lòng nhập quyền lợi";

        if (!address.trim()) newErrors.address = "Vui lòng nhập địa điểm làm việc";
        else if (address.length > 150) newErrors.address = "Không được vượt quá 150 ký tự";

        if (!expiryDate.trim()) newErrors.expiryDate = "Vui lòng nhập thời hạn ứng tuyển";
        else if (isNaN(new Date(expiryDate)) || new Date(expiryDate) <= new Date())
            newErrors.expiryDate = "Thời hạn ứng tuyển phải lớn hơn ngày hiện tại";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Hàm xử lý khi nhấn nút "Cập nhật"
    const handleUpdate = async () => {
        if (validate()) {
            setLoading(true);
            const jobPost = {
                id: job.id,
                title,
                jobPosition,
                salary,
                quantity: Number(quantity),
                type,
                remote,
                description,
                requirements,
                benefits,
                address,
                expiryDate,
                company: job.company,
                jobApplyCount: job.jobApplyCount,
            };
            const data = await updateJobPost(job.id, jobPost);
            if (data.success) {
                showToast("success", data.message);
                route.params?.onGoBack?.(jobPost);
                navigation.goBack();
            } else {
                showToast("error", data.message);
            }
            setLoading(false);
        }
    };

    // Hàm hủy cập nhật
    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="auto" />
            {loading && <OverlayLoading />}
            <ScrollView className="flex-1 px-6">
                {/* Các trường nhập liệu tương tự CreateJobPost */}
                <Text className="text-base font-bold mb-2 mt-2">Tiêu đề</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập tiêu đề"
                        value={title}
                        onChangeText={setTitle}
                        multiline
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.title && <Text className="text-red-500 mb-4">{errors.title}</Text>}

                {/* Vị trí công việc */}
                <Text className="text-base font-bold mb-2">Vị trí công việc</Text>
                <View className="bg-gray-200 rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập vị trí công việc"
                        value={jobPosition}
                        onChangeText={setJobPosition}
                        multiline
                        className="text-base text-gray-700"
                        editable={false} // Không cho phép chỉnh sửa
                    />
                </View>
                {errors.jobPosition && <Text className="text-red-500 mb-4">{errors.jobPosition}</Text>}

                {/* Mức lương */}
                <Text className="text-base font-bold mb-2">Mức lương</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập mức lương"
                        value={salary}
                        onChangeText={setSalary}
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.salary && <Text className="text-red-500 mb-4">{errors.salary}</Text>}

                {/* Số lượng tuyển dụng */}
                <Text className="text-base font-bold mb-2">Số lượng tuyển dụng</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập số lượng"
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.quantity && <Text className="text-red-500 mb-4">{errors.quantity}</Text>}

                {/* Loại hợp đồng */}
                <Text className="text-base font-bold mb-2">Loại hợp đồng</Text>
                <View className="bg-white rounded-lg   mb-2">
                    <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
                        <Picker.Item label="Chọn loại hợp đồng" value="" />
                        <Picker.Item label="Toàn thời gian" value="Toàn thời gian" />
                        <Picker.Item label="Bán thời gian" value="Bán thời gian" />
                    </Picker>
                </View>
                {errors.type && <Text className="text-red-500 mb-4">{errors.type}</Text>}

                {/* Hình thức làm việc */}
                <Text className="text-base font-bold mb-2">Hình thức làm việc</Text>
                <View className="bg-white rounded-lg mb-2">
                    <Picker selectedValue={remote} onValueChange={(itemValue) => setRemote(itemValue)}>
                        <Picker.Item label="Chọn hình thức làm việc" value="" />
                        <Picker.Item label="Trực tiếp" value="Trực tiếp" />
                        <Picker.Item label="Làm từ xa" value="Làm từ xa" />
                        <Picker.Item label="Làm việc kết hợp" value="Làm việc kết hợp" />
                    </Picker>
                </View>
                {errors.remote && <Text className="text-red-500 mb-4">{errors.remote}</Text>}

                {/* Mô tả công việc */}
                <Text className="text-base font-bold mb-2">Mô tả công việc</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập mô tả công việc"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.description && <Text className="text-red-500 mb-4">{errors.description}</Text>}

                {/* Yêu cầu ứng viên */}
                <Text className="text-base font-bold mb-2">Yêu cầu ứng viên</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập yêu cầu ứng viên"
                        value={requirements}
                        onChangeText={setRequirements}
                        multiline
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.requirements && <Text className="text-red-500 mb-4">{errors.requirements}</Text>}

                {/* Quyền lợi */}
                <Text className="text-base font-bold mb-2">Quyền lợi</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập quyền lợi"
                        value={benefits}
                        onChangeText={setBenefits}
                        multiline
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.benefits && <Text className="text-red-500 mb-4">{errors.benefits}</Text>}

                {/* Địa điểm làm việc */}
                <Text className="text-base font-bold mb-2">Địa điểm làm việc</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-2">
                    <TextInput
                        placeholder="Nhập địa điểm"
                        value={address}
                        onChangeText={setAddress}
                        className="text-base text-gray-700"
                    />
                </View>
                {errors.address && <Text className="text-red-500 mb-4">{errors.address}</Text>}

                {/* Thời hạn ứng tuyển */}
                <Text className="text-base font-bold mb-2">Thời hạn ứng tuyển</Text>
                <TouchableOpacity
                    className="bg-white rounded-lg px-4 py-3 mb-2"
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text className={`text-base ${expiryDate ? "text-gray-700" : "text-gray-400"}`}>
                        {expiryDate ? formatDate(expiryDate) : "Chọn thời hạn"}
                    </Text>
                </TouchableOpacity>
                {errors.expiryDate && <Text className="text-red-500 mb-4">{errors.expiryDate}</Text>}

                {showDatePicker && (
                    <DateTimePicker
                        value={expiryDate ? new Date(expiryDate) : new Date()} // Ngày mặc định
                        mode="date"
                        display="default"
                        minimumDate={new Date()} // Chỉ cho phép ngày trong tương lai
                        onChange={handleDateChange}
                    />
                )}

                {/* Nút cập nhật và hủy */}
                <View className="flex-row justify-between gap-2 py-3">
                    <TouchableOpacity
                        className="border border-green-600 rounded-full py-3 px-4 w-[25%]"
                        onPress={handleCancel}
                    >
                        <Text className="text-green-600 text-center font-bold text-base">Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-green-600 rounded-full py-3 w-[70%]" onPress={handleUpdate}>
                        <Text className="text-white text-center font-bold text-base">Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default UpdateJobPost;
