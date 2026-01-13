import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  // Use NEXT_PUBLIC_ prefix for client-side env variables in Next.js
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      needsVerification: false,

      signup: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/auth/signup", {
            username: formData.email.split("@")[0],
            displayName: formData.name,
            email: formData.email,
            password: formData.password,
          });
          // After register, we always need verification
          set({ isLoading: false, needsVerification: true });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Registration failed";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      signin: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/signin", {
            emailOrUsername: data.email,
            password: data.password,
          });
          const { user } = response.data;

          // If the backend says user is not verified,
          // we don't set isAuthenticated yet.
          if (user.verified === false) {
            set({
              user,
              needsVerification: true,
              isLoading: false,
              isAuthenticated: false,
            });
            return { success: false, status: "UNVERIFIED" };
          }

          set({
            user,
            isAuthenticated: true,
            needsVerification: false,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          set({
            error: err.response?.data?.message || "Login failed",
            isLoading: false,
          });
          return { success: false };
        }
      },

      verifyOTP: async (email, otp) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/verify-otp", { email, otp });
          const { user } = response.data;

          set({
            user,
            isAuthenticated: true,
            needsVerification: false, // Handshake complete
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Invalid sequence";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      updateMe: async (data) => {
        set({ isLoading: true, error: null });
        // 1. Capture the toast ID to update it later
        const toastId = toast.loading("SYNCING_IDENTITY: Updating profile...");

        try {
          const result = await api.post("/user/update-profile", data, {
            headers: {
              // Axios usually sets this automatically for FormData, but keeping it is fine
              "Content-Type": "multipart/form-data",
            },
          });

          const updatedUser = result.data.user;

          set({
            success: true,
            isLoading: false,
            error: null,
            user: updatedUser,
          });

          // 2. Update the SAME toast instead of creating a new one
          toast.success("IDENTITY_SYNCED: Data written to node", {
            id: toastId,
          });

          return {
            success: true,
            user: updatedUser,
          };
        } catch (err) {
          const message =
            err.response?.data?.message || "Profile update failed";

          set({ error: message, isLoading: false });

          // 3. Update the toast to error state
          toast.error("SYNC_FAILURE", { id: toastId, description: message });

          return { success: false, message };
        }
      },

      signout: async () => {
        const response = await api.post("/auth/signout");
        console.log(response.data);
        set({
          user: null,
          isAuthenticated: false,
          needsVerification: false,
          error: null,
        });

        // 2. Optional: If you MUST redirect from inside the store
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
      },

      // Helper to clear errors when switching pages
      clearError: () => set({ error: null }),
    }),
    {
      name: "mazlis-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
