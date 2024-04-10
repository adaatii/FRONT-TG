import { AnySoaRecord } from 'dns';
import Connection from '../Connection';
import setting from './settings/employers';
import { employee } from './interfaces'; 

export const getEmployeeData = () => {
    const config = setting.employee("GET", null);
    return Connection.getApiResult(...config);
}

export const postEmployeeData = (data: employee) => {
    const config = setting.employee("POST", data);
    return Connection.getApiResult(...config);
}

export const putEmployeeData = (data: employee) => {
    const config = setting.employee("PUT", data);
    return Connection.getApiResult(...config);
}

export const deleteEmployeeData = (data: employee) => {
    const config = setting.employee("DELETE", data);
    return Connection.getApiResult(...config);
}


export default getEmployeeData; 