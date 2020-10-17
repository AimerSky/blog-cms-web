// axios
import axios from 'axios'


// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9981',
  timeout: 15000, // 请求超时时间

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `headers` 是即将被发送的自定义请求头
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  },

});

// request拦截器
service.interceptors.request.use(config => {
  var authorization = localStorage.getItem("tokenHead") + localStorage.getItem("token");
  if (authorization) {
    config.headers['Authorization'] = authorization // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error); // for debug
  Promise.reject(error);
});


// http响应拦截器
service.interceptors.response.use(res => {
    if (res.data.code != 10000) {
      //window.CommonMsg(res.data.message);
      alert(res.data.message);
    }
    return res.data
  },
  error => {
    alert('请求失败，请稍后重试！');
  }
);


export default service

