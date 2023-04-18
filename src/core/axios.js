import axios from "axios";

export const Axios = axios.create({ baseURL: "http://35.175.216.60/" });
export const Canceler = axios.CancelToken.source();
