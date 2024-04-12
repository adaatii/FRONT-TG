import Connection from "../Connection";
import setting from "./settings/categories";
import { category } from "./interfaces";

// Get all employees
export const getCategoryData = () => {
  const config = setting.category("GET", null);
  return Connection.getApiResult(...config);
};

// Register a new employee
export const postCategoryData = (data: category) => {
  const config = setting.category("POST", data);
  return Connection.getApiResult(...config);
};

// Update employee data
export const putCategoryData = (data: category) => {
  const config = setting.category("PUT", data);
  return Connection.getApiResult(...config);
};

// Delete employee
export const deleteCategoryData = (data: category) => {
  console.log(data);
  const config = setting.category("DELETE", data);
  return Connection.getApiResult(...config);
};

export default getCategoryData;
