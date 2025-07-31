// hooks/useFetchSession.ts
import { Session, useSessionStore } from "@/stores/useSessionStore";
import { api } from "@/actions/api";
import { useCallback } from "react";

export const useFetchSession = () => {
  const { setSession, setLoading } = useSessionStore();

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<Session>("/auth/session", {});
      console.log("Session fetched successfully", res);
      setSession(res);
    } catch {
      console.warn("Access token is invalid or expired");
      try {
        await api.post("/auth/refresh", {}, {});
        console.log("Access token refreshed successfully");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await api.get<Session>("/auth/session", {});
        setSession(res);
      } catch (error) {
        console.error("Error refreshing token");
        setSession(null);
      }
    } finally {
      setLoading(false);
    }
  }, [setSession, setLoading]);

  return fetchSession;
};
