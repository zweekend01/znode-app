import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
// import Joi from 'joi-browser';

// token 无效时，跳转至登录页面的路径
const getPathname: () => string = (): string => `/login?from=${decodeURIComponent(window.location.pathname)}`;

// 为 axios 全局配置一些默认值
axios.defaults.baseURL = 'http://localhost:8888/api';
axios.defaults.headers = { 'Content-Type': 'application/json' };

// 为 axios 设置拦截器
axios.interceptors.request.use(undefined, (): Promise<any> => Promise.reject(new Error('发起请求失败')));
axios.interceptors.response.use((response: AxiosResponse): AxiosResponse | Promise<any> => {
  const { data: { code, msg }, status } = response;
  if (code === 'success') return response;
  // 如果 token 有问题，直接跳转至登录页
  if (code === 'user:token_invalid') window.location.href = getPathname();
  return Promise.reject(new Error(`-${status}：${msg}`));
}, (error: AxiosError): Promise<any> => {
  let message: string;
  if (error.response || error.request) {
    const { status, statusText } = error.response || error.request;
    // 如果未授权，直接跳转至登录页
    if (statusText === 'Unauthorized') window.location.href = getPathname();
    message = `-${status}：${statusText}`;
  } else {
    message = `：${error.message}`;
  }
  return Promise.reject(new Error(message));
});


interface RequestConfig {
  needToken?: boolean;
  showLoading?: boolean;
  loadingText?: string;
  hideLoading?: boolean;
  showSuccess?: boolean;
  successText?: string;
  showError?: boolean;
  errorText?: string;
};

export default class Http {
  static request({
    needToken = true,
    showLoading = true,
    loadingText = '正在加载数据',
    hideLoading = true,
    showSuccess = true,
    successText = '数据加载成功',
    showError = true,
    errorText = '数据加载失败',
    ...config
  }: RequestConfig): Promise<any> {
    // 类型断言
    const axiosRequestconfig: AxiosRequestConfig = config as AxiosRequestConfig;

    return new Promise((resolve, reject) => {
      let hide: Function;
      if (needToken) axiosRequestconfig.headers = { 'Authorization': localStorage.getItem('token') };
      if (showLoading) hide = message.loading(loadingText, 0);

      axios(axiosRequestconfig)
        .then((response: AxiosResponse) => {
          if (hideLoading && hide) hide();
          if (showSuccess) message.success(successText);
          // 如果 data 中有 token，则存入缓存中
          const token = response.headers.authorization
          if (token) localStorage.setItem('token', token);
          resolve(response.data.data);
        })
        .catch((error) => {
          if (hideLoading && hide) hide();
          if (showError) message.error(`${errorText}${error.message}`);
          reject(error);
        });
    });
  }
}
