import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Session = {
  authenticated: boolean;
  userId: string;
  email: string;
  role: string;
} | null;

type SessionStore = {
    session: Session;
    loading: boolean;
    setSession: (session: Session) => void;
    setLoading: (loading: boolean) => void;
    // fetchSession: () => Promise<void>;
    // clearSession: () => void;
}

interface SessionResponse extends Response {
    data: Session
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      loading: true,
      setSession: (session: Session) => set({ session }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: "session-store",
      partialize: (state) => ({ session: state.session }),
    }
  )
);