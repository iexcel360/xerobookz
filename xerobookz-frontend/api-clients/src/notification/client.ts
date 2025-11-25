import { apiClient } from "../core/client";
import { Notification } from "./types";
import { APIResponse } from "../types";

export const notificationApi = {
  getNotifications: async (): Promise<APIResponse<Notification[]>> => {
    return apiClient.get("/notifications");
  },
};

