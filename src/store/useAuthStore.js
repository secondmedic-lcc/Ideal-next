import { create } from "zustand";
import { adminLogin } from "@/services/admin/adminLogin";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    loading: false,

    login: async (data) => {
        set({ loading: true });
        try {
            const result = await adminLogin(data);

            if (result.status === true) {

                const userDetails = result.data.userDetails;
                const token = result.data.token;

                set({
                    user: userDetails,
                    token: token,
                    loading: false,
                });

                localStorage.setItem("user", JSON.stringify(userDetails));
                localStorage.setItem("token", token);
            } else {
                set({ loading: false });
            }
            return result;

        } catch (error) {
            set({ loading: false });
            throw new Error(error?.message || "Login failed");
        }
    },

    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    },
}));
