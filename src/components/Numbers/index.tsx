import Taro, { Component } from '@tarojs/taro'
import { View, Text  } from '@tarojs/components'
import './index.less';

interface Props {
    list:{num:string, active: boolean}[]
}
export default class Index extends Component<Props> {
    
    onCheck = (i:number):any => {
        const { list } = this.props;
        list[i].active = !list[i].active;
        this.setState({
            list
        })
    }

    render() {
        const { list } = this.props;
         return (
            <View className="row per-6 justify-content-flex-start bg-color-white">
            {list.map((item, index) => (
                <View className="col text-align-center">
                    <Text onClick={() => this.onCheck(index)} key={`${index}`} className={item.active?"num active":"num color-red"}>{item.num}</Text>
                </View> 
            ))
            }
                   
            </View>
        )
    }
}