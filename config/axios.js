import axios from "axios";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log(11111)
    if (resopnse.data.code === 40011) {
      console.log(11111)
      this.$router.push("/login")
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
