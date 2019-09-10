import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { getNextEvent, getNextOpenTime } from '../../utils/utils';
import './index.less'
import dlt from '../../assets/icons/dlt.png'

interface IProps{
  dispatch?: any;
  [propName: string]: any;
}


@connect(({ common, loading }) => ({
  common,
  ...loading,
}))
export default class Index extends Component<IProps> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state ={
    lastEventName: '',
    lastOpenTime: {},
    list:[]
  }
  componentWillMount () { }

  componentDidMount () {
    const {dispatch, common:{list}} = this.props;
    dispatch({
      type: 'common/getDlt',
    }).then(() => {
      const {common:{ dlt }} = this.props;
      this.setState({
        lastEventName: dlt.eventName[0],
        lastOpenTime:dlt.lottery.openTime,
        list
      })
    })
   
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

 

  onGoNumber() {
    Taro.navigateTo({ url: '/pages/pickNumbers/index' });
  }

  onShowNumber(numbers) {
    const tile = `前：${numbers.redArr.join(' ')} \n
                  后：${numbers.blueArr.join(' ')}`
    Taro.showToast({
       title: tile,
      icon: 'none',
      duration: 3000
    })
  }

  onDeleteItem(idx:string) {
    Taro.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if(res.confirm) {
          const list:{id:string}[] = this.state.list;
          const len = list.length;
          if(len === 0) return;
          const newList:{id:string}[] = []
          for(let i = 0; i<len; i++) {
            if(list[i].id !== idx) {
              newList.push(list[i])
            }
          }
          this.setState({
            list: newList
          },() => {
            Taro.setStorageSync('list', newList);
            const {dispatch} = this.props
            dispatch({
              type:'common/changeList',
              payload: {list: newList}
            })
            Taro.showToast({
              title: '已删除'
            })
          })
        }else if (res.cancel) {
          return
        }
      }
    })

  }

  onClear() {
    Taro.showModal({
      title: '提示',
      content: '是否要全部删除？',
      success: (res) => {
        if(res.confirm) {
          const list = [];
          this.setState({
            list
          },() => {
            Taro.setStorageSync('list', list);
            const {dispatch} = this.props
            dispatch({
              type:'common/changeList',
              payload: {list}
            })
            Taro.showToast({
              title: '已清空'
            })
          })
        } else if(res.cancel) {
          return
        }
      }
    })
  }

  render () {
    const{ lastEventName, lastOpenTime, list } = this.state;
    return (
      <View className='index page'>
        <View className="padding-half bg-color-white"><Text>{getNextEvent(parseInt(lastEventName, 10),lastOpenTime['time'])}期 </Text><Text>{getNextOpenTime(lastOpenTime['time'])}</Text><Text> 20:00截至购买</Text></View>
        <View className="row margin-half">
            <Button onClick={() => {this.onGoNumber()}} type="primary" className="col-50" size="mini" plain> + 选号输入</Button>
            <Button type="primary" className="col-50" size="mini" plain> + 图片识别</Button>  
        </View> 
        <View className="card">
          <View className="card-header no-padding-vertical" style="display:block;min-height: auto;">
              等待开奖<Text className="color-gray" style="font-size: 12px;">（走上人生巅峰就靠这一波了~~）</Text>
          </View>
          <View className="card-content">
            <View className="list media-list no-safe-areas">
            
              <View className="ul">
                {
                  list.length === 0 ? 
                  <View className="li">
                    <View className="item-content">
                      <View className="item-inner">
                        <View className="item-text">空空如也...</View>
                      </View>
                    </View>
                    </View>:
                  list.map((item:{redArr:[],blueArr:[], lottery:{openTime_fmt:string},accounts:number, time:string, term:string,id:string}, index) => (
                    <View className="li" key={`${index}`}>
                    <View className="item-content">
                      <View className="item-inner">
                        <View className="item-title-row">
                          <View className="item-title" onClick={() => this.onShowNumber(item)}>
                            <Text className="color-red">{item.redArr.join(' ')}</Text> <Text className="color-blue">{item.blueArr.join(' ')}</Text>
                          </View>
                          <View className="item-after"><Image src={dlt} mode="widthFix" style="width:20px;"/>{item.term}</View>
                        </View>
                        <View className="item-subtitle"><Text>{item.lottery.openTime_fmt}开奖</Text> <Text className="link float-right" onClick={() => {this.onDeleteItem(item.id)}}>删除</Text></View>
                        <View className="item-text display-block">
                          <Text>{item.accounts === 1 ?'单式':'复式'}</Text><Text style="margin:0 8px">{item.accounts}注</Text> <Text>{item.accounts*2}元</Text>
                          <Text className="color-gray float-right" style="font-size: 12px;">{item.time}</Text>
                        </View>
                      </View>
                    </View>
                    </View>
                  ))
                }
               
  
              </View>
              
            </View>
          </View>
          <View className="card-footer">
            <Text className="link">中奖纪录</Text>
            <Text className="link" style={"cursor: pointer;"} onClick={() => {this.onClear()}}>清空</Text>
          </View>
        </View>
       
      </View>
    )
  }
}
