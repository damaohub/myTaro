import Taro from '@tarojs/taro';

const baseUrl ='http://127.0.0.1:7001/';
const noConsole = false;
const request_data = {
};

declare  type Method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" ;

interface Options {
  url:string;
  method:Method | any;
  data?:object;
  [propName: string]: any;
}

  
export default (options:Options = {url: '', method: 'GET' }) => {
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
      return data;
    } else {
      Taro.showToast({
        title: data.message ||`${statusCode}`,
        icon: 'none',
        mask: true,
      });
     
    }
  }).catch((e) =>{throw new Error(e)});
};