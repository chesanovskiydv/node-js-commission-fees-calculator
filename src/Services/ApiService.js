import { api } from '../utils/index.js';

export default class ApiService {
  constructor(baseURL) {
    this.http = api.createInstance(baseURL);
  }

  /**
   * Get options for 'cash-in' transactions from api
   *
   * @returns {Promise<AxiosResponse<*>>} Options for 'cash-in' transactions
   */
  getCashIn() {
    return this.http.get('/cash-in').then((response) => response.data);
  }

  /**
   * Get options for 'cash-out' transactions from api for given user type
   *
   * @param {string} type User type
   * @returns {Promise<AxiosResponse<*>>} Options for 'cash-out' transactions
   */
  getCashOut(type) {
    return this.http.get(`/cash-out-${type}`).then((response) => response.data);
  }
}
