import React from "react";
import axios from "axios";
import { Row, Col,Divider,Slider, Button,InputNumber,Select, Space  } from 'antd';


class Setbox extends React.Component {
    constructor(props){
        super(props)
        this.state={para:[]}
    }
    Change = value => {
        let data = {
            ID:this.props.info.ID,
            value:value
        }
        console.log(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: data
        }).then(response => {
              console.log(response.data)
        })
    }

     handleChange = (value) => {
        let data = {
            ID:this.props.info.ID,
            value:parseInt(value)
        }
        console.log(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: data
        }).then(response => {
              console.log(response.data)
        })
      };

    render() {
        console.log(this.props.info)
        if(this.props.info.isMenu!=true){
            return(
                <div>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>{this.props.info.name}</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}><Slider max={this.props.info.maximum} min={this.props.info.minimum}   defaultValue={this.props.info.value} onAfterChange={this.Change} /></Col>
                        <Col span={1}> </Col>
                    </Row>
                </div> 
            )
        }else{
            var defaultvalue=this.props.info.menuItems[this.props.info.value]
            var data=[]
            for(var key in this.props.info.menuItems){
                let p={ value: key, label: this.props.info.menuItems[key] }
                data.push(p)
            }
            return(
                <div>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>{this.props.info.name}</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={23}>                        
                            <Select
                                defaultValue={defaultvalue}
                                style={{ width: 120 }}
                                onChange={this.handleChange}
                                options={data}
                                />
                        </Col>

                    </Row>

                </div>
            )
            
        }

    }
}


class Parameters extends React.Component {
    constructor(props){
        super(props)
        this.state={para:[]}
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/device/config")
        .then(res=> res.json())
        .then(json =>{
            this.setState({
                para:json.data
            })
        })

    }
    componentDidUpdate(){
      

    }
    
    render() {
        this.W=document.documentElement.clientWidth
        return(
            <div>
                <Row>
                    <Col span={24}><img style={{width: this.W}}  src="http://raspberrypi:9999/api/device/realtime/video" alt="video"></img></Col>
                </Row>
                <div style={{marginBottom:'30px'} }>
                    {this.state.para.map(para =>
                    <div key={para.ID}>
                        <Setbox info={para}></Setbox>
                    </div> )}

                </div>
            </div>
        )
    }
  }
  
  export default Parameters;