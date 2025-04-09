import { api } from "../api";

export const getAllItems = async () => {
    try {
        const response = await api.get("/items", {});
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
}