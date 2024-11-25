import axiosClient from "../api/axiosClient";
import { RECRUITERS_API } from "../api/constants";

export const updateProfile = async (profile) => {
    return axiosClient.post(RECRUITERS_API.UPDATE_PROFILE, {
        name: profile.name,
        position: profile.position,
        phone: profile.phone,
        recruiterEmail: profile.recruiterEmail,
        website: profile.website,
        description: profile.description,
        companyAddress: profile.companyAddress,
        companyLogo: profile.companyLogo,
    });
};

export const uploadLogo = async (logo) => {
    const formData = new FormData();
    formData.append("logo", logo);

    return axiosClient.post(RECRUITERS_API.UPLOAD_LOGO, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllRecruiters = async (page, size, search) => {
    return axiosClient.get(RECRUITERS_API.GET_ALL, {
        params: {
            page: page,
            size: size,
            query: search,
        },
    });
};
