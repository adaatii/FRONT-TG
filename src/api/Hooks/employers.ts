import Connection from '../Connection';
import setting from './settings/employers';
import { employee } from './interfaces'; 

// Get all employees
export const getEmployeeData = () => {
    const config = setting.employee("GET", null);
    return Connection.getApiResult(...config);
}

// Register a new employee
export const postEmployeeData = (data: employee) => {
    const config = setting.employee("POST", data);
    return Connection.getApiResult(...config);
}

// Update employee data
export const putEmployeeData = (data: employee) => {
    const config = setting.employee("PUT", data);
    return Connection.getApiResult(...config);
}

// Delete employee
export const deleteEmployeeData = (data: employee) => {
    console.log(data.id);
    const config = setting.employee("DELETE", data);
    return Connection.getApiResult(...config);
}

export default getEmployeeData; 