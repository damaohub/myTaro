import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button, Navigator  } from '@tarojs/components'
import './index.less'
import dlt from '../../assets/icons/dlt.png'

export default class Index extends Component {

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

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goNumber() {
    Taro.navigateTo({ url: '/pages/pickNumbers/index' });
  }

  render () {
    return (
      <View className='index page'>
        <View className="padding-half bg-color-white"><Text>19082期</Text><Text>07-17（周三）</Text><Text>20:00截至购买</Text></View>
        <View className="row margin-half">
            <Button onClick={() => {this.goNumber()}} type="primary" className="col-50" size="mini" plain> + 选号输入</Button>
            <Button onClick={() => {this.goNumber()}} type="primary" className="col-50" size="mini" plain> + 图片识别</Button>  
        </View> 
        <View className="card">
          <View className="card-content">
            <View className="list media-list chevron-center no-safe-areas">
            
              <View className="ul">
                <View className="li">
                <Navigator className="item-content item-link">
                  {/* <View className="item-media">
                    
                  </View> */}
                  <View className="item-inner">
                    <View className="item-title-row">
                      <View className="item-title">
                        <Text className="color-red">20 17 03 06 28</Text> <Text className="color-blue">07 09</Text>
                      </View>
                      <View className="item-after"><Image src={dlt} mode="widthFix" style="width:20px;"/>19100期</View>
                    </View>
                    <View className="item-subtitle color-green">尚未开奖</View>
                    <View className="item-text">2019年09月20日开奖</View>
                  </View>
                </Navigator>
                </View>
                
                <View className="li">
                <Navigator className="item-content item-link">
                  {/* <View className="item-media">
                    
                  </View> */}
                  <View className="item-inner">
                    <View className="item-title-row">
                      <View className="item-title">
                        <Text className="color-red">20 17 03 06 28</Text> <Text className="color-blue">07 09</Text>
                      </View>
                      <View className="item-after"><Image src={dlt} mode="widthFix" style="width:20px;"/>19100期</View>
                    </View>
                    <View className="item-subtitle color-green">尚未开奖</View>
                    <View className="item-text">2019年09月20日开奖</View>
                  </View>
                </Navigator>
                </View>

                <View className="li item-content">
                  <View className="item-media">
                    <Image src='https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg' mode="widthFix" style="width:64px;"/>
                  </View>
                  <View className="item-inner">
                    <View className="item-title-row">
                      <View className="item-title">Yellow Submarine</View>
                    </View>
                    <View className="item-subtitle">Beatles</View>
                  </View>
                </View>
                <View className="li item-content">
                  <View className="item-media">
                    <Image src='https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg' mode="widthFix" style="width:64px;"/>
                  </View>
                  <View className="item-inner">
                    <View className="item-title-row">
                      <View className="item-title">Yellow Submarine</View>
                    </View>
                    <View className="item-subtitle">Beatles</View>
                  </View>
                </View>
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
