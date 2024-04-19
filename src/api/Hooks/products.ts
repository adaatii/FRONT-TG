import Connection from "../Connection";
import setting from "./settings/products";
import { product } from "./interfaces";

// Get all employees
export const getProductData = (token:string) => {
  const config = setting.product("GET", token, null);
  return Connection.getApiResult(...config);
};

// Register a new employee
export const postProductData = (data: product, token:string) => {
  const config = setting.product("POST", token, data);
  return Connection.getApiResult(...config);
};

// Update employee data
export const putProductData = (data: product, token:string) => {
  const config = setting.product("PUT", token,  data);
  return Connection.getApiResult(...config);
};

// Delete employee
export const deleteProductData = (data: product, token:string) => {
  const config = setting.product("DELETE", token, data);
  return Connection.getApiResult(...config);
};

export default getProductData;
