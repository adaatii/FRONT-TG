import Connection from '../Connection';
import setting from './settings/employers';

const getDeliveryData = (type: string, data: any) => {
    const config = setting.employee(type, data);
    return Connection.getApiResult(...config);
}

export default getDeliveryData; 