import { useApiQuery, useApiMutation } from "../core/hooks";
import { employeeApi } from "./client";
import { Employee, EmployeeCreate, EmployeeUpdate } from "./types";

export const useGetEmployees = () => {
  return useApiQuery<Employee[]>(["employees"], "/employees");
};

export const useGetEmployee = (id: string) => {
  return useApiQuery<Employee>(["employees", id], `/employees/${id}`, {
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  return useApiMutation((data: EmployeeCreate) => employeeApi.createEmployee(data));
};

export const useUpdateEmployee = () => {
  return useApiMutation(({ id, data }: { id: string; data: EmployeeUpdate }) =>
    employeeApi.updateEmployee(id, data)
  );
};

export const useGetEmployeeDocuments = (id: string) => {
  return useApiQuery<any[]>(["employees", id, "documents"], `/employees/${id}/documents`, {
    enabled: !!id,
  });
};

