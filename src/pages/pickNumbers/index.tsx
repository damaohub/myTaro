import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Button, Picker, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getNextEvent, mathAccount } from '../../utils/utils';
import dlt from '../../assets/icons/dlt.png';
import './pickNumber.less';

const getObjArray = (len:number):{num:string, active?:boolean}[] => {
    if (len == 0) return [{num: '0', active: false}]; 
    const arr:{num:string,active?:boolean}[] = [];
    for(let i = 1; i < len+1; i ++ ) {
        const str:string  =  ('' + i).length < 2 ? '0' + i : i.toString();
        arr.push({num: str, active: false});
    }
    return arr;
}

const getItemArray = (sorce:{num:string, active?:boolean}[]):string[] => {
    const Arr:string[] = []
    for(let i = 0; i <sorce.length; i++){
        if(sorce[i].active) Arr.push(sorce[i].num)
    }
    return Arr;
}

interface IProps{
    dispatch?: any;
  [propName: string]: any;
}

@connect(({common, numb, loading }) => ({
    common,
    numb,
    ...loading,
  }))
export default class Index extends Component<IProps> {
    config: Config = {
        navigationBarTitleText: '首页'
    }
    state = {
        red: getObjArray(35),
        blue: getObjArray(12),
        redArr: [],
        blueArr: [],
        selector: [],
        selectorChecked: '',
    }
    componentWillMount () { }

    componentDidMount () {
    const {dispatch} = this.props;
        dispatch({
            type: 'common/getDlt',
        }).then(() => {
            const {common:{ dlt }} = this.props;
            const time = dlt.lottery.openTime.time;
            const eventNames = dlt.eventName;
            const fEvent = getNextEvent(parseInt(eventNames[0], 10),time).toString();
            eventNames.unshift(fEvent);
            this.setState({
                selectorChecked: fEvent,
                selector:eventNames
            })
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

    onCheck = (i:number,type:number):any => {
        const {red, blue} = this.state;
        switch (type){
            case 1:
            red[i].active = !red[i].active;
            this.setState({
                red
            }, () => {         
                this.setState({
                    redArr:getItemArray(red)
                })
            })
            break;
            case 2:
            blue[i].active = !blue[i].active;
            this.setState({
                blue
            }, () => {
                this.setState({
                    blueArr:getItemArray(blue)
                })
            })
            break; 
        }
    }

    onClear() {
       
        this.setState({
            red: getObjArray(35),
            blue: getObjArray(12),
            redArr: [],
            blueArr: []
        })
       
    }

    onSure() {
        const { redArr, blueArr, selectorChecked } = this.state;
        const {dispatch} = this.props;
        if(redArr.length === 0 || blueArr.length === 0 || selectorChecked==='') {
            Taro.showToast({
                title:"请输入数字或期数",
                icon:'none'
            })
            return;
        };
        dispatch({
            type: 'numb/saveArr',
            payload: { redArr, blueArr, term: selectorChecked}
        }).then(
            () => {
                Taro.showToast({
                    title:"已录入",
                    icon: 'success'
                })
              Taro.redirectTo({
                url: '/pages/index/index'
            })
           
            }
        )  
        
    }

    render () {
        const { red, blue, redArr, blueArr } = this.state;
        const accounts = mathAccount(redArr.length, 5)*mathAccount(blueArr.length, 2);
        return (
            <View className='pick-numbers page'>
                {/* <View className="padding-half bg-color-white"><Text>19082期</Text><Text>07-17（周三）</Text><Text>20:00截至购买</Text></View> */}
                <View className="list  margin-vertical-half">
                    <View className="ul">
                        <View className="li">
                            <Picker value={0} mode='selector' range={this.state.selector} onChange={this.onChange}>
                                <View className="item-link item-content">
                                    <View className="item-media">
                                        <Image src={dlt} mode="widthFix" style="width:20px;"/>
                                    </View>
                                    <View className="item-inner">
                                        <View className="item-title">期数：</View>
                                        <View className="item-after">{this.state.selectorChecked}</View>
                                    </View>
                                </View>
                            </Picker>
                        </View>
                    </View>
                </View>
                
                {/* <View className="padding-half bg-color-white margin-vertical-half">
                    <Picker value={0} mode='selector' range={this.state.selector} onChange={this.onChange}>
                        <View className='picker'>
                        期数（默认下一期）：{}
                        </View>
                    </Picker>
                </View> */}
                <View>
                    <View>至少选择5个红球， 2个蓝球</View>
                    <View className="row row-red per-6 justify-content-flex-start bg-color-white">
                    {red.map((item, index) => (
                        <View className="col text-align-center">
                            <Text onClick={() => this.onCheck(index, 1)} key={`${index}`} className={item.active?"num active":"num color-red"}>{item.num}</Text>
                        </View> 
                    ))
                    }
                    </View>
                    
                    <View className="row row-blue per-6 justify-content-flex-start bg-color-white margin-top">
                    {blue.map((item, index) => (
                        <View className="col text-align-center">
                            <Text onClick={() => this.onCheck(index, 2)} key={`${index}`} className={item.active?"num active":"num color-blue"}>{item.num}</Text>
                        </View> 
                    ))
                    }
                    </View>
                </View>
                <View className="toolbar toolbar-bottom">
                    <View className="toolbar-inner no-padding-right">
                        <View onClick={() => this.onClear()} className="link">清空</View>
                        <View>共{accounts}注，{accounts*2}元</View>
                        <View onClick={() => this.onSure()} className="align-self-flex-end"> <Button type="warn" disabled={accounts === 0? true: false}>确定</Button></View>   
                    </View>
                </View>
            </View>
        )
    }
}