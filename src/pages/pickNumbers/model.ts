// import Taro from '@tarojs/taro';
import * as pickNumberApi from './service';
export default {
  namespace: 'numb',
  state: {
    redArr:[],
    blueArr:[]
  },

  effects: {
    *saveArr({payload}, {put, call}) {
        const res = yield call(pickNumberApi.getData, {payload});
        console.log(res)
        yield put({
            type:'save',
            payload
        })
    },
  },

  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload};
    }

  },
 
    

};