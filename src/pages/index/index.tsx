import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button, Navigator, Picker  } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { getNextEvent, getNextOpenTime } from '../../utils/utils';
import './index.less'
import dlt from '../../assets/icons/dlt.png'
import { object } from 'prop-types';

interface IProps{
  dispatch?: any;
  [propName: string]: any;
}

const colorClass = (type) => {
  switch(type) {
    case 0:
      return '';
    case -1:
      return 'color-green';
    default:
      return 'color-red';
  }
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
    selector: ['未开奖', '未中奖', '已开奖'],
    selectorChecked: '未开奖',
  }
  componentWillMount () { }

  componentDidMount () {
    const {dispatch} = this.props;
    dispatch({
      type: 'common/getDlt',
    }).then(() => {
      const {common:{ dlt }} = this.props;
      this.setState({
        lastEventName: dlt.eventName[0],
        lastOpenTime:dlt.lottery.openTime
      })
    })
    const list = this.props.common.list || [];
    let losingList:object[] = [],
        awardedList:object[] = [],
        unawardedList:object[] = [];
    list.length !==0 && list.map(item => {
      switch (item.type) {
        case -1:
          losingList.push(item);
          break;
        case 0:
          unawardedList.push(item);
          break;
        default:
          awardedList.push(item);
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  goNumber() {
    Taro.navigateTo({ url: '/pages/pickNumbers/index' });
  }

  render () {
    const{ lastEventName, lastOpenTime } = this.state;
    const list = this.props.common.list || [];
    return (
      <View className='index page'>
        <View className="padding-half bg-color-white"><Text>{getNextEvent(parseInt(lastEventName, 10),lastOpenTime['time'])}期 </Text><Text>{getNextOpenTime(lastOpenTime['time'])}</Text><Text> 20:00截至购买</Text></View>
        <View className="row margin-half">
            <Button onClick={() => {this.goNumber()}} type="primary" className="col-50" size="mini" plain> + 选号输入</Button>
            <Button type="primary" className="col-50" size="mini" plain> + 图片识别</Button>  
        </View> 
        <View className="card">
          <View className="card-header no-padding-vertical" style="display:block;min-height: auto;">
            
              <View className="list links-list">
                  <View className="ul">
                  <Picker value={0} mode='selector' range={this.state.selector} onChange={this.onChange}>
                    <View className="li">
                      <View className="a">{this.state.selectorChecked}</View>
                    </View>
                    </Picker>
                  </View>
              </View>
            
          </View>
          <View className="card-content">
            <View className="list media-list chevron-center no-safe-areas">
            
              <View className="ul">
                {
                  list.map((item, index) => (
                    <View className="li" key={`${index}`}>
                    <Navigator className="item-content">
                      <View className="item-inner">
                        <View className="item-title-row">
                          <View className="item-title">
                            <Text className="color-red">{item.redArr.join(' ')}</Text> <Text className="color-blue">{item.blueArr.join(' ')}</Text>
                          </View>
                          <View className="item-after"><Image src={dlt} mode="widthFix" style="width:20px;"/>{item.term}</View>
                        </View>
                        <View className={"item-subtitle " + colorClass(item.type)}>{item.level}</View>
                        <View className="item-text">{item.lottery.openTime_fmt}开奖</View>
                      </View>
                    </Navigator>
                    </View>
                  ))
                }
               
  
              </View>
              
            </View>
          </View>
          <View className="card-footer">
            <Text className="link">什么的</Text>
            <Text className="link" style={"cursor: pointer;"}>清空</Text>
          </View>
        </View>
       
      </View>
    )
  }
}
