import axios from 'axios';
import qs from 'qs';
class Http {
  constructor(router) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    this.$axios = axios.create({
      baseURL: '/proxy/',
      timeout: 5000000
    });
    this.$axios.interceptors.request.use(config => {
      if (config.url.split("/")[0] === "admin") {
        config['headers']['Authorization'] = 'BEARER ' + sessionStorage.getItem('adminToken');
      } else {
        config['headers']['Authorization'] = 'BEARER ' + sessionStorage.getItem('token');
      }
      config['data'] = qs.stringify(config['data']);
      return config;
    }, error => Promise.reject(error));
    this.$axios.interceptors.response.use(response => {
      if (response.status === 200) {
        if (response.data) {
          if (response.data.Status === 200) {
            return Promise.resolve(response.data);
          } else if (response.data.Status === 502) {
            if (sessionStorage.getItem("adminToken")) {
              router.push("admin/login")
            } else {
              router.push("/login")
            }
            return Promise.reject(response.data);
          } else if (response.data.Status === 201) {
            return Promise.reject(response.data);
          } else {
            return Promise.reject(response.data);
          }
        }
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    }, (error) => {
      return Promise.reject(error);
    });
  }
  /**
   * GET
   * 
   * @param {String}  [url]       - 链接
   * @param {Object}  [params]    - 参数
   */
  get(url, params = {}) {
    return this.$axios.get(`${url}`, {
      params
    })
  }
  /**
   * POST
   * 
   * @param {String}  [url]       - 链接
   * @param {Object}  [data]      - 数据
   * @param {Object}  [config]    - 配置
   */
  post(url, data = {}, config = {}) {
    return this.$axios.post(`${url}`, data, config);
  }
}

export default Http
