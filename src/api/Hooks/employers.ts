import { AnySoaRecord } from 'dns';
import Connection from '../Connection';
import setting from './settings/employers';

export const getEmployeeData = () => {
    const config = setting.employee("GET", null);
    return Connection.getApiResult(...config);
}

export const postEmployeeData = (data: any) => {
    const config = setting.employee("POST", data);
    return Connection.getApiResult(...config);
}

export default getEmployeeData; 