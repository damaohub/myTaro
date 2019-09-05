import Taro from '@tarojs/taro';
import * as indexApi from '../pages/index/service';
export default {
  namespace: 'common',
  state: {
    // access_token: Taro.getStorageSync('access_token'),
    list: Taro.getStorageSync('list') || [],
    dlt: {}
  },

  effects: {
     *getDlt(_:any,{call, put}) {
      const res = yield call(indexApi.getDlt, _);
      yield put({
        type: 'save',
        payload: res
      })
     },
     *changeList({payload}, {put}) {
      yield put({
        type: 'save',
        payload,
      })
     }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    change(state, payload) {
      return { ...state, ...payload };
    }
  },
};