import Taro from '@tarojs/taro';

/**
 * NOTE HOST 是在 config 中通过 defineConstants 配置的
 * 可在代码中直接引用，但是总报错
 */

/* tslint:disable */
/* eslint-disable */
const baseUrl = HOST;
/* eslint-enable */
/* tslint:enable */



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