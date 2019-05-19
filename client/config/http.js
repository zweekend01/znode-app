import axios from 'axios'
import { message } from 'antd'

message.config = { maxCount: 1 }

// 为axios全局配置一些默认值

// 为axios设置拦截器
function setInterceptors ({
  showSuccess,
  successText,
  errorText
} = {}) {
  axios.interceptors.request.use(() => {
    const err = new Error()
    err.message = errorText
    return Promise.reject(err)
  })

  axios.interceptors.response.use((response) => {
    const { data: { code, msg }, status } = response

    if (code === '0') {
      if (showSuccess) message.success(successText)
      return response
    }

    const error = new Error()
    error.message = `${errorText}-${status}: ${msg}`
    return Promise.reject(error)
  }, (error) => {
    const err = new Error()
    if (error.response || error.request) {
      const { status, statusText } = error.response || error.request
      err.message = `${errorText}-${status}:${statusText}`
    } else {
      err.message = `${errorText}:${error.message}`
    }
    return Promise.reject(err)
  })
}

/**
 * @param {string} [method] - 创建请求时使用的方法
 * @param {string} [baseURL]
 * @param {string} url - 用于请求的服务器 URL
 * @param {Object|URLSearchParams} [params] - 将与请求一起发送的 URL 参数
 * @param {Function} [paramsSerializer] - 负责 params 序列化的函数
 * @param {string|Object|ArrayBuffer|ArrayBufferView|URLSearchParams|FormData|File|Blob|Stream}
 *    [data] - 作为请求主体被发送的数据
 * @param {Function[]} [transformRequest] - 在向服务器发送之前，修改请求数据的函数数组
 * @param {Object} [headers] - 即将被发送的自定义请求头
 * @param {boolean} [withCredentials] - 表示跨域请求时是否需要使用凭证
 * @param {Object} [auth] - 表示应该使用 HTTP 基础验证，并提供凭据，覆写掉headers中的'Authorization'头
 * @param {Function} [onUploadProgress] - 为数据上传定义的处理进度事件
 * @param {Function} [onDownloadProcess] - 为数据下载定义的处理进度事件
 * @param {number} [timeout] - 请求超时的毫秒数(0 表示无超时时间)
 * @param {string} [responseType]
 *    - 表示服务器响应的数据类型，包括: 'arraybuffer'、'blob'、'document'、'json'、'text'、'stream'
 * @param {number} [maxContentLength] - 定义允许的响应内容的最大尺寸
 * @param {string} [responseEncoding] - 表示已什么样的编码方式去decoding返回值
 * @param {Function} [validateStatus] - 定义对于给定的HTTP 响应状态码是 resolve 或 reject promise
 * @param {Function[]} [transformResponse] - 在传递给 then/catch 前，允许修改响应数据
 * @param {Object} [proxy] - 定义代理服务器的主机名称和端口
 */

export default function request ({
  method = 'GET',
  baseURL = '',
  url,
  params = null,
  paramsSerializer = null,
  data = null,
  transformRequest = null,
  headers = { 'content-type': 'application/x-www-form-urlencoded' },
  withCredentials = false, // default
  auth = null,
  onUploadProgress = null,
  onDownloadProcess = null,
  timeout = 1000,
  responseType = 'json', // default
  maxContentLength = 2000,
  responseEncoding = 'utf8', // default
  validateStatus = status => status >= 200 && status < 300, // default
  transformResponse = null,
  proxy = null,
  showLoading = true,
  loadingText = '正在加载数据',
  hideLoading = true,
  showSuccess = true,
  successText = '数据加载成功',
  showError = true,
  errorText = '数据加载失败'
} = {}) {
  return new Promise((resolve, reject) => {
    if (showLoading) window.eventEmitter.emit('startLoading', loadingText)

    setInterceptors({
      hideLoading, showSuccess, successText, showError, errorText
    })

    axios({
      method,
      baseURL,
      url,
      params,
      paramsSerializer,
      data,
      transformRequest,
      headers,
      withCredentials,
      auth,
      onUploadProgress,
      onDownloadProcess,
      timeout,
      responseType,
      maxContentLength,
      responseEncoding,
      validateStatus,
      transformResponse,
      proxy
    })
      .then(response => resolve(response.data.data))
      .catch(error => reject(error))
  })
}
