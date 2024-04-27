import Connection from "../Connection";
import setting from "./settings/categories";
import { category } from "./interfaces";

// Get all employees
export const getCategoryData = (token:string) => {
  const config = setting.category("GET", token, null);
  return Connection.getApiResult(...config);
};

// Register a new employee
export const postCategoryData = (data: category, token:string) => {
  const config = setting.category("POST", token, data);
  return Connection.getApiResult(...config);
};

// Update employee data
export const putCategoryData = (data: category, token:string) => {
  const config = setting.category("PUT", token,data);
  return Connection.getApiResult(...config);
};

// Delete employee
export const deleteCategoryData = (data: category, token:string) => {
  const config = setting.category("DELETE", token, data);
  return Connection.getApiResult(...config);
};

export default getCategoryData;
