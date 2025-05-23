import { create } from "zustand";
import { api } from "@/actions/api";

type Session = {
  authenticated: boolean;
  userId: string;
  email: string;
  role: string;
} | null;

type SessionStore = {
    session: Session;
    loading: boolean;
    fetchSession: () => Promise<void>;
    clearSession: () => void;
}

interface SessionResponse extends Response {
    data: Session
}

export const useSessionStore = create<SessionStore>((set) => ({
    session: null,
    loading: true,
    fetchSession: async() => {
        try{
            const res: SessionResponse = await api.get("/auth/session", {})
            set({session: res.data, loading: false})
        } catch {
            set({session: null, loading: false})
        }
    },

    clearSession: () => {
        set({session: null})
    }
}))