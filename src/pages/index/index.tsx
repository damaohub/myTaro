import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button  } from '@tarojs/components'
import './index.less'

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

  render () {
    return (
      <View className='index page'>
        <View className="padding-half bg-color-white"><Text>19082期</Text><Text>07-17（周三）</Text><Text>20:00截至购买</Text></View>
        <View className="row margin-half">
            <Button className="button col-50" type="primary">手动输入</Button>
            <Button className="button col-50" type="primary">图像输入</Button> 
        </View> 
        <View className="card">
          <View className="card-content">
            <View className="list media-list links-list no-safe-areas">
            
              <View className="ul">
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
            <Text>我已经阅读并且同意《的哈四度哈说的话》</Text>
            <Text>清空</Text>
          </View>
        </View>
       
      </View>
    )
  }
}
