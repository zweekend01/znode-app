import axios from 'axios';
import { message } from 'antd';

// message.config = { maxCount: 1 };

// 为axios全局配置一些默认值

// 为axios设置拦截器
axios.interceptors.request.use(undefined, () => {
  const err = new Error();
  err.message = '接口未正常调用';
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  const { data: { code, msg }, status } = response;
  if (code === '0') {
    return response;
  }

  const err = new Error()
  err.message = `-${status}：${msg}`;
  return Promise.reject(err);
}, (error) => {
  const err = new Error();
  if (error.response || error.request) {
    const { status, statusText } = error.response || error.request;
    err.message = `-${status}：${statusText}`;
  } else {
    err.message = `：${error.message}`;
  }
  return Promise.reject(err);
});


interface IRequest {
  method?: string | undefined;
  baseURL?: string;
  url: string;
  params?: Object | URLSearchParams;
  paramsSerializer?: Function;
  data?: string | Object | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob;
  transformRequest?: Function[];
  headers?: Object;
  withCredentials?: boolean;
  auth?: Object;
  onUploadProgress?: Function;
  onDownloadProgress?: Function;
  timeout?: number;
  responseType?: string;
  maxContentLength?: number;
  responseEncoding?: string;
  validateStatus?: Function;
  transformResponse?: Function[];
  proxy?: Object;
  needToken?: boolean;
  showLoading?: boolean;
  loadingText?: string;
  hideLoading?: boolean;
  showSuccess?: boolean;
  successText?: string;
  showError?: boolean;
  errorText?: string;
}

export default class Http {
  static request({
    method = 'GET',
    baseURL = '',
    url,
    params = {},
    paramsSerializer = () => {},
    data = {},
    transformRequest = [],
    headers = { 'content-type': 'application/x-www-form-urlencoded' },
    withCredentials = false, // default
    auth = {},
    onUploadProgress = () => {},
    onDownloadProgress = () => {},
    timeout = 2000,
    responseType = 'json', // default
    maxContentLength = 2000,
    responseEncoding = 'utf8', // default
    validateStatus = (status: number): boolean => status >= 200 && status < 300, // default
    transformResponse = [],
    proxy = {},
    needToken = true,
    showLoading = true,
    loadingText = '正在加载数据',
    hideLoading = true,
    showSuccess = true,
    successText = '数据加载成功',
    showError = true,
    errorText = '数据加载失败'
  }: IRequest) {
    return new Promise((resolve, reject) => {
      let _url = url;
      if (needToken) {
        _url += url.indexOf('?') === -1 ? '?' : '&';
        _url += `token=${localStorage.getItem('token')}`;
      }
      if (showLoading) {
        window.eventEmitter.emit('startLoading', loadingText);
      }

      axios(method, {
        method,
        baseURL,
        params,
        paramsSerializer,
        data,
        transformRequest,
        headers,
        withCredentials,
        auth,
        onUploadProgress,
        onDownloadProgress,
        timeout,
        responseType,
        maxContentLength,
        // responseEncoding,
        validateStatus,
        transformResponse,
        proxy,
        url: _url
      })
        .then((response) => {
          if (hideLoading) window.eventEmitter.emit('stopLoading')
          if (showSuccess) message.success(successText)
          resolve(response.data.data)
        })
        .catch((error) => {
          if (hideLoading) window.eventEmitter.emit('stopLoading')
          if (showError) message.error(`${errorText}${error.message}`)
          reject(error)
        })
    })
  }
}
