import Taro from '@tarojs/taro';
import * as pickNumberApi from './service';
export default {
  namespace: 'numb',
  state: {
    redArr:[],
    blueArr:[],
    term: ''
  },

  effects: {
    *saveArr({payload}, {put, call, select}) {
      const { list } = yield select(state => state.common);
      const res = yield call(pickNumberApi.checkDlt, payload);
      list.push({...payload, ...res})
        yield put({
            type:'save',
            payload
        })
        Taro.setStorageSync('list', list);
        yield put({
          type:'commom/add',
          payload:list
        })
    },
  },

  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload};
    }

  },
 
    

};