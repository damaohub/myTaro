import Taro from '@tarojs/taro';
import * as pickNumberApi from './service';
export default {
  namespace: 'numb',
  state: {
    redArr:[],
    blueArr:[],
    term: '',
    item: null
  },

  effects: {
    *saveArr({payload}, {put, call, select}) {
      const res = yield call(pickNumberApi.checkDlt, payload);
      if(res.type === -1){
        const { list } = yield select(state => state.common);
        list.unshift({...payload, ...res})
        Taro.setStorageSync('list', list);
        yield put({
          type:'commom/save',
          payload:list
        })
      } else {
        yield put({
          type:'save',
          payload:{ ...payload, item: res }
      })
      }  
    },

    *reset(_:any, {put}) {
      yield put({
        type: 'save',
        payload:{redArr:[], blueArr:[], term:'', item: null, accounts: undefined}
      })
    }
  },

  reducers: {
    save(state, {payload}) {
      return { ...state, ...payload};
    }

  },
 
    

};