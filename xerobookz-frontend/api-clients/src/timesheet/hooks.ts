import { useApiQuery, useApiMutation } from "../core/hooks";
import {
  Timesheet,
  AttendanceRecord, AttendanceClockInRequest, AttendanceClockOutRequest,
  Schedule, ScheduleCreate, Shift, ShiftCreate
} from "./types";

export const useGetTimesheets = () => {
  return useApiQuery<Timesheet[]>(["timesheets"], "/timesheets");
};

export const useGetTimesheet = (id: string) => {
  return useApiQuery<Timesheet>(["timesheets", id], `/timesheets/${id}`, {
    enabled: !!id,
  });
};

// ========== ENTERPRISE: TIME & ATTENDANCE HOOKS ==========

export const useClockIn = () => {
  return useApiMutation<AttendanceRecord, AttendanceClockInRequest>("/timesheet/attendance/clock-in", "POST");
};

export const useClockOut = () => {
  return useApiMutation<AttendanceRecord, AttendanceClockOutRequest>("/timesheet/attendance/clock-out", "POST");
};

export const useGetAttendanceRecords = (employeeId?: string) => {
  const params = employeeId ? `?employee_id=${employeeId}` : "";
  return useApiQuery<AttendanceRecord[]>(["timesheet", "attendance", "records", employeeId], `/timesheet/attendance/records${params}`);
};

export const useCreateSchedule = () => {
  return useApiMutation<Schedule, ScheduleCreate>("/timesheet/schedules", "POST");
};

export const useGetSchedules = (employeeId?: string) => {
  const params = employeeId ? `?employee_id=${employeeId}` : "";
  return useApiQuery<Schedule[]>(["timesheet", "schedules", employeeId], `/timesheet/schedules${params}`);
};

export const useCreateShift = () => {
  return useApiMutation<Shift, ShiftCreate>("/timesheet/shifts", "POST");
};

