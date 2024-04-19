import Connection from "../Connection";
import setting from "./settings/employers";
import { employee } from "./interfaces";

// Get all employees
export const getEmployeeData = (token: any) => {
  const config = setting.employee("GET", token, null);
  return Connection.getApiResult(...config);
};

// Register a new employee
export const postEmployeeData = (data: employee, token: any) => {
  const config = setting.employee("POST", token, data);
  return Connection.getApiResult(...config);
};

// Update employee data
export const putEmployeeData = (data: employee, token: any) => {
  const config = setting.employee("PUT", token, data);
  return Connection.getApiResult(...config);
};

// Delete employee
export const deleteEmployeeData = (data: employee, token: any) => {
  const config = setting.employee("DELETE", token, data);
  return Connection.getApiResult(...config);
};

export default getEmployeeData;

