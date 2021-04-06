import axios from 'axios';

/**
 * Create an instance of Axios
 *
 * @param {string} baseURL The base URL
 * @param {object} options Options for making requests
 *
 * @returns {AxiosInstance} Axios instance
 */
function createInstance(baseURL, options = {}) {
  return axios.create({ baseURL, ...options });
}

export default { createInstance };
