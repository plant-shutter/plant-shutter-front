import React from "react";
import axios from "axios";
import { Row, Col,Divider,Slider, Button,InputNumber,Space } from 'antd';

class Video extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        this.W=document.documentElement.clientWidth
        this.H=this.W*(this.props.H/this.props.W)
        if(this.props.sign==7){
            return(
                <div>
                    <img style={{width: this.W, height: this.H}}  src={this.props.data} ></img>
                </div>
            )
        }
        else{
            return(
                <div >
                    <Row justify="space-around" align="middle">
                        <Col span={24} style={{width: this.W, height: this.H ,backgroundColor: "#81b71a" ,textAlign:"center"}}>图像数据在路上</Col>
                    </Row>
                </div>
            )
        }

    }
}


class Propset extends React.Component {

    constructor(props){
        super(props)
        this.state={data:"",sign:0,H:480,W:640}
        this.H=document.documentElement.clientHeight
        this.W=document.documentElement.clientWidth
        this.EXP=300000
        this.B=1.5
        this.R=1.5
        this.ISO=60
        this.looping=1
        this.sign=0
        this.delaytime=20000
        this.file="video"
        this.getmsg()
        console.log(this.B)
        // this.getphoto()
    }
  
    ChangeEXP = value => {
        console.log(value)
        this.EXP=value
    };

    ChangeISO = value => {
        this.ISO=value
    };

    ChangeB = value => {
        this.B=value/100
    };

    ChangeR = value => {
        this.R=value/100
    };

    PressEnter = value => {
        this.delaytime=value
        console.log(this.delaytime)
    };



    getphoto(){
        console.log(this.B)
          axios({
            method: 'POST', // 请求类型
            url: 'http://192.168.1.100:1889/a', // 请求 url
            
            data: {
                EXP:this.EXP,
                B:this.B,
                R:this.R,
                ISO:this.ISO,
            }
        }).then(response => {
            this.setState({
              data:"data:image/png;base64,"+response.data.data,
              H:response.data.H,
              W:response.data.W,
              sign:7

            })
            this.getphoto()
        })
    }


    getmsg(){
        axios({
          method: 'POST', // 请求类型
          url: 'http://192.168.1.100:1889/getmsg', // 请求 url
          
          data: {

          }
      }).then(response => {
            console.log(response.data)
            this.looping=response.data.looping
            if(response.data.hasOwnProperty("pitimelapse")){
                this.EXP=response.data.pitimelapse.EXPOSURE
                this.B=response.data.pitimelapse.U
                this.R=response.data.pitimelapse.V
                this.ISO=response.data.pitimelapse.ISO_SPEED
                this.sign=1
            }else{
                this.sign=1
            }
            if(this.looping===1){
                this.delaytime=response.data.delaytime
            }
            this.getphoto()
      })

  }

    startrec=() =>{
        this.looping=1

        axios({
            method: 'POST', // 请求类型
            url: 'http://192.168.1.100:1889/startrec', // 请求 url
            
            data: {
                EXP:this.EXP,
                B:this.B,
                R:this.R,
                ISO:this.ISO,
                delaytime:this.delaytime,
                looping:this.looping
            }
        }).then(response => {
                console.log(response.data)
        })

    }

    stoprec=() =>{
        this.looping=0

        axios({
            method: 'POST', // 请求类型
            url: 'http://192.168.1.100:1889/stoprec', // 请求 url
            
            data: {

            }
        }).then(response => {
                console.log(response.data)
                this.looping=0
                if(response.data.hasOwnProperty("pitimelapse")){
                    this.EXP=response.data.pitimelapse.EXPOSURE
                    this.B=response.data.pitimelapse.U
                    this.R=response.data.pitimelapse.V
                    this.ISO=response.data.pitimelapse.ISO_SPEED
                    this.sign=2
                    this.file=response.data.file
                    console.log(111)
                }else{
                    this.sign=2
                }
                this.setState({
                    sign:1
                  })
        })

    }



    componentDidUpdate(){
        // this.getphoto()
    }


    render() {
        console.log("render")
        console.log(this.B)

        function formatterR(value) {
            return `${value/100}`;
          }

        function formatterB(value) {
            return `${value/100}`;
          }

        function formatterISO(value) {
            return `${value}`;
          }

        function formatterEXP(value) {
            return `${value}µs`;
          }

        if(this.sign===0 && this.looping===0){
            return(
                <div>等待页面加载。。。</div>
            )
        }
        else if(this.sign===1 && this.looping===0){
            return(
                <div>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Row justify="space-around" align="middle">
                            <Col span={24}><Video data={this.state.data} H={this.state.H} W={this.state.W} sign={this.state.sign}/></Col>
                        </Row>
                        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>白平衡红</Col>
                            <Col span={18}><Slider max={250} min={30} tipFormatter={formatterR} onAfterChange={this.ChangeR} defaultValue={this.R*100}  /></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>白平衡蓝</Col>
                            <Col span={18}><Slider max={250} min={30} tipFormatter={formatterB} onAfterChange={this.ChangeB} defaultValue={this.B*100} /></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>ISO</Col>
                            <Col span={18}><Slider max={1600} min={60} tipFormatter={formatterISO} onAfterChange={this.ChangeISO} defaultValue={this.ISO} /></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>曝光时间</Col>
                            <Col span={18}><Slider max={300000} min={10}  tipFormatter={formatterEXP} onAfterChange={this.ChangeEXP} defaultValue={this.EXP}/></Col>
                            <Col span={1}></Col>
                        </Row>

                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>缩时倍数</Col>
                            <Col span={2}> </Col>
                            <Col span={17}><InputNumber min={0} max={100000} defaultValue={20000} addonAfter="倍" onChange={this.PressEnter} /></Col>
                        </Row>

                        <Row justify="space-around" align="middle">
                            <Col span={8}> </Col>
                            <Col align="center"  span={8}><Button type="primary" shape="round"  size="large" onClick={this.startrec} >开始录制</Button></Col>
                            <Col span={8}> </Col>
                        </Row>
                    </Space>
            </div>
            )
        }
        else if(this.sign===1 && this.looping===1){
            return(
                <div>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Row justify="space-around" align="middle">
                            <Col span={24}><Video data={this.state.data} H={this.state.H} W={this.state.W} sign={this.state.sign}/></Col>
                        </Row>
                        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>白平衡红</Col>
                            <Col span={18}><Slider max={250} min={30} tipFormatter={formatterR}  defaultValue={this.R*100}  value={this.R*100}/></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>白平衡蓝</Col>
                            <Col span={18}><Slider max={250} min={30} tipFormatter={formatterB} defaultValue={this.B*100} value={this.B*100}/></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>ISO</Col>
                            <Col span={18}><Slider max={1600} min={60} tipFormatter={formatterISO}  defaultValue={this.ISO} value={this.ISO}/></Col>
                            <Col span={1}></Col>
                        </Row>
        
                        <Row justify="space-around" align="middle">
                            <Col span={1}> </Col>
                            <Col span={4}>曝光时间</Col>
                            <Col span={18}><Slider max={300000} min={10}  tipFormatter={formatterEXP} defaultValue={this.EXP} value={this.EXP}/></Col>
                            <Col span={1}></Col>
                        </Row>

                        <Row justify="space-around" align="middle">
                                <Col span={1}> </Col>
                                <Col span={4}>缩时倍数</Col>
                                <Col span={2}> </Col>
                                <Col span={17}>{this.delaytime}倍</Col>
                        </Row>

                        <Row justify="space-around" align="middle">
                                <Col span={8}> </Col>
                                <Col align="center"  span={8}><Button danger type="primary" shape="round"  size="large" onClick={this.stoprec} >结束录制</Button></Col>
                                <Col span={8}> </Col>
                        </Row>
                    </Space>
            </div>
            )
        }
        else if(this.sign===2){



            window.location.href = window.location.origin+'/#/Wait';

            return(

                
                <div>
                    <p>结束拍摄中...</p>
                </div>
            )

            
        }

    }
  }
  
  export default Propset;