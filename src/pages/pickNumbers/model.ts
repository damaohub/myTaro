import Taro from '@tarojs/taro';

export default {
  namespace: 'mumber',
  state: {
    redArr:[],
    blueArr:[]
  },

  effects: {
    *saveArr(payload, {put}) {
        yield put({
            type:'save',
            payload
        })
    },
  },

  reducers: {
   
    deleteClothes(state, { payload }) {
      const { id } = payload;
      const items = state.items.filter(item => item.product_id != id);
      // 设置衣袋小红点
      if (items.length > 0) {
        Taro.setStorageSync('items', items);
        Taro.setTabBarBadge({
          index: 1,
          text: String(items.length),
        });
      } else {
        Taro.removeStorageSync('items');
        Taro.removeTabBarBadge({
          index: 1,
        });
      }
      return {
        ...state,
        ...{
          items,
        },
      };
    },
    init() {
      Taro.removeStorageSync('items');
      Taro.removeTabBarBadge({
        index: 1,
      });
      return {
        items: [],
      };
    },
  },
 
    save(state, { payload }) {
        return { ...state, ...payload };
    }

};