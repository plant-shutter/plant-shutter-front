import React from "react";
import axios from "axios";
import { Row, Col,Divider,Slider, Button,InputNumber,Space } from 'antd';

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

        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: data
        }).then(response => {
              console.log(response.data)
        })
    }

    render() {
        
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
            console.log(this.state)
        })

    }
    componentDidUpdate(){
        console.log("did updata")

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