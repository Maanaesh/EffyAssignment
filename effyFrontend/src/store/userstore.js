import { create } from "zustand";
import { getUsers } from "../api/api";

export const userStore = create((set,get)=>({
    users:[],
    fetchAllUsers : async () => {
        try {
            const response = await getUsers(); 
            set({users:response.data.data});
        } catch (err) {
            console.error("Error fetching all users:", err);
        }
    },
}));