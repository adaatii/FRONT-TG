import Connection from "../Connection";
import setting from "./settings/products";
import { product } from "./interfaces";

// Get all employees
export const getProductData = () => {
  const config = setting.product("GET", null);
  return Connection.getApiResult(...config);
};

// Register a new employee
export const postProductData = (data: product) => {
  const config = setting.product("POST", data);
  return Connection.getApiResult(...config);
};

// Update employee data
export const putProductData = (data: product) => {
  const config = setting.product("PUT", data);
  return Connection.getApiResult(...config);
};

// Delete employee
export const deleteProductData = (data: product) => {
  const config = setting.product("DELETE", data);
  return Connection.getApiResult(...config);
};

export default getProductData;
