import { useApiQuery } from "../core/hooks";
import { Notification } from "./types";

export const useGetNotifications = () => {
  return useApiQuery<Notification[]>(["notifications"], "/notifications");
};

