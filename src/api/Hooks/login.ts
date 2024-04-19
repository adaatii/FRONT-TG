import Connection from '../Connection';
import setting from './settings/login';


export const loginEmployee = (data: any) => {
  const config = setting.login(data);
  return Connection.getApiResult(...config);
};

export default loginEmployee;