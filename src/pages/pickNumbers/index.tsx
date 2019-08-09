import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './pickNumber.less';

const getArray = (len:number):string[] => {
    if (len == 0) return ['0']; 
    const arr:string[] = [];
    for(let i = 1; i < len+1; i ++ ) {
        const str:string  =  ('' + i).length < 2 ? '0' + i : i.toString();
        arr.push(str);
    }
    return arr;
}

export default class Index extends Component {
    config: Config = {
        navigationBarTitleText: '首页'
    }
    
    componentWillMount () { }

    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    render () {
        const red = getArray(36);
        return (
            <View className='pick-numbers page'>
                <View className="padding-half bg-color-white"><Text>19082期</Text><Text>07-17（周三）</Text><Text>20:00截至购买</Text></View>
                <View className="padding-half bg-color-white margin-vertical-half">19082期 开奖结果：04 13 20 26 28 03 12</View>
                <View>
                    <View>至少选择5个红球， 2个蓝球</View>
                    <View className="row per-6 justify-content-flex-start">
                    {red.map((item, index) => (
                        <Text key={`${index}`} className="col text-align-center">{item}</Text>
                    ))
                    }
                        
                        
                    </View>
                </View>
            </View>
        )
    }
}