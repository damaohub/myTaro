// import Taro from '@tarojs/taro';

export default {
    namespace: 'index',
    state: {
      // access_token: Taro.getStorageSync('access_token'),
      data: [],
    },
  
    effects: {
       
    },
  
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
    },
  };