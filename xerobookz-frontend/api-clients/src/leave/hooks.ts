import { useApiQuery } from "../core/hooks";
import { LeaveRequest } from "./types";

export const useGetLeaveRequests = () => {
  return useApiQuery<LeaveRequest[]>(["leave", "requests"], "/leave/request");
};

