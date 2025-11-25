import { apiClient } from "../core/client";
import { LeaveRequest } from "./types";
import { APIResponse } from "../types";

export const leaveApi = {
  getLeaveRequests: async (): Promise<APIResponse<LeaveRequest[]>> => {
    return apiClient.get("/leave/request");
  },
};

