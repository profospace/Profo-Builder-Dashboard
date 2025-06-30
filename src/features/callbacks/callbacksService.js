import axios from "axios";
import { base_url } from "../../utils/baseurl";

const getAllCallbacks = async (builderId, status = '', page = 1, limit = 10) => {
    let url = `${base_url}/api/callback/builder/${builderId}?page=${page}&limit=${limit}`;

    if (status) {
        url += `&status=${status}`;
    }

    const response = await axios.get(url);

    console.log("callbacks service", response);
    return response.data;
};

const updateCallbackStatus = async (callbackId, status) => {
    const response = await axios.put(`${base_url}/api/callback/${callbackId}`, {
        status
    });

    return response.data;
};

const deleteCallback = async (callbackId) => {
    const response = await axios.delete(`${base_url}/api/callback/${callbackId}`);

    return response.data;
};

const callbacksService = {
    getAllCallbacks,
    updateCallbackStatus,
    deleteCallback
};

export default callbacksService;