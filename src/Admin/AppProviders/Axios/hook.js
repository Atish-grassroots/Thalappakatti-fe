import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
 const BASE_URL = "http://127.0.0.1:42400";

const relayService = ({ url, method = "GET", headers, data }) => {
  console.log(url, method, headers, data);
  const axios_instance = axios({
    url,
    method,
    baseURL: BASE_URL,
    headers,
    data,
  });
  return axios_instance;
};

export default relayService;
