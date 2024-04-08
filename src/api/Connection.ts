import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

/**
 * Function that intercepts errors (401), and returns a promise with the error message
 * @type {Function} errorInterceptor
 */
const errorInterceptor = (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Network Error."));
  }

  if (error.response?.status === 401) {
    // Do something
  }

  return Promise.reject(error);
};

/**
 * Function that intercepts responses, and returns a promise with the response
 * @type {Function} responseInterceptor
 */
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

interface Settings {
  headers?: { [key: string]: string };
}

/**
 * Class that creates a connection with the API
 * @class Connection
 */
class Connection {
  private api: AxiosInstance;

  public constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add any other headers you need here
      },
    });
  }

  // Connection.ts
public getApiResult(
  request: Object,
  settings: Settings | null
 ): Promise<[any, number]> {
  var api = this.api;
 
  if (settings != null) {
     api = axios.create({
       ...settings,
       headers: {
         ...this.api.defaults.headers,
         ...settings.headers,
       },
     });
  }
  api.interceptors.response.use(
     (response) => responseInterceptor(response),
     (error) => errorInterceptor(error)
  );
 
  return new Promise((resolve, reject) => {
     try {
       api(request)
         .then(async (res) => {
           if (res.data.error) {
             reject([res.data.body, res.data.status]);
           } else {
             resolve([res.data, res.status]);
           }
         })
         .catch((error) => {
           reject([error.message || "An error occurred", error.response?.status || 500]);
         });
     } catch (error) {
       reject(error);
     }
  });
 }
}

const connectionInstance = new Connection();

export default connectionInstance;