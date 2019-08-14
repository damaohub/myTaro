import Taro from '@tarojs/taro';

const baseUrl ='';
const noConsole = false;
const request_data = {
  platform: 'wap',
  rent_mode: 2,
};

type Method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;

interface Options {
  method:Method | any;
  data?:object;
  [propName: string]: any;
}

  
export default (options:Options = { method: 'GET' }) => {
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    );
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data,
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      if (data.status !== 'ok') {
        Taro.showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};