import album from "./icons/album.svg"
import shooting from "./icons/shooting.svg"
import setting from "./icons/setting.svg"
import logo from "./icons/logo.png"

import React from "react";
import axios from "axios";
import { Image, Row, Col, Divider, Slider, Button, InputNumber, Select, Space, Progress, Typography, List, Popconfirm, message } from 'antd';
const { Title } = Typography;


class Setbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = { para: [] }
    }
    Change = value => {
        let data = {
            ID: this.props.info.ID,
            value: value
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
            ID: this.props.info.ID,
            value: parseInt(value)
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
        if (this.props.info.isMenu != true) {
            return (
                <div>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>{this.props.info.name}</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}><Slider max={this.props.info.maximum} min={this.props.info.minimum} defaultValue={this.props.info.value} onAfterChange={this.Change} /></Col>
                        <Col span={1}> </Col>
                    </Row>
                </div>
            )
        } else {
            var defaultvalue = this.props.info.menuItems[this.props.info.value]
            var data = []
            for (var key in this.props.info.menuItems) {
                let p = { value: key, label: this.props.info.menuItems[key] }
                data.push(p)
            }
            return (
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


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dist: [] }
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/device/disk")
            .then(res => res.json())
            .then(json => {
                json.data.usedPercent = json.data.usedPercent.toFixed(2)
                this.setState({
                    dist: json.data
                })
            })

    }
    componentDidUpdate() {


    }

    render() {
        return (
            <div>
                <Row style={{position:"fixed" ,zIndex:"1",top:"0px",left:"0px"}}>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#000000", padding: "1%" }}>

                            <Row justify="space-around" align="middle" >
                                <Col span={2} style={{ display: 'flex' }}>
                                    <Row justify="space-around" align="middle"  >
                                        <Col span={24} style={{ display: 'flex' }}>
                                            <div style={{ width: "80%" }}>
                                                <img src={logo} style={{ width: "100%", height: "100%", display: "flex" }} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={20}><Typography style={{ textAlign: "center", color: "#FFFFFF" }}>plant-shutter</Typography></Col>
                                <Col span={2}></Col>

                            </Row>

                        </div>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={24}><img style={{ width: "100%", height: "100%" }} src="http://raspberrypi:9999/api/device/realtime/video" alt="video"></img></Col>
                        </Row>
                    </Col>
                </Row>



                <Space direction="vertical" size="small" style={{ display: 'flex' ,marginTop:"86%"}}>

                    <Divider style={{ margin: "0" }} orientation="left">存储</Divider>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={5}><Progress type="circle" percent={this.state.dist.usedPercent} width={70} /></Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Row >
                                    <Col style={{ margin: "0" }} span={24}>
                                        <Title style={{ margin: "0" }} level={5}>磁盘空间</Title>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: "0" }} span={24}>
                                        <Title style={{ margin: "0" }} level={5}>剩余{this.state.dist.used}，共{this.state.dist.total}</Title>
                                    </Col>
                                </Row>
                            </Space>

                        </Col>
                        <Col span={5}></Col>
                    </Row>
                </Space>

                <Divider style={{ margin: "1" }} orientation="left"></Divider>

                <Row >
                    <Col span={1}></Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Row justify="space-around" align="middle"  >
                            <Col span={1}></Col>
                            <Col span={22} style={{ display: 'flex' }}>
                                <div style={{ width: "100%", display: "flex", border: "1px solid #9A9A9A", borderRadius: "10%" }}>
                                    <Row >
                                        <Col span={24}>&nbsp; </Col>
                                        <Col span={5}></Col>
                                        <Col span={14}>  <img src={album} style={{ width: "100%", height: "100%", display: "flex" }} /></Col>
                                        <Col span={5}></Col>
                                        <Col span={24} ><Typography style={{ textAlign: "center" }}>相册浏览</Typography></Col>
                                    </Row>

                                </div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Row justify="space-around" align="middle"  >
                            <Col span={1}></Col>
                            <Col span={22} style={{ display: 'flex' }}>
                                <div style={{ width: "100%", display: "flex", border: "1px solid #9A9A9A", borderRadius: "10%" }}>
                                    <Row >
                                        <Col span={24}>&nbsp; </Col>
                                        <Col span={5}></Col>
                                        <Col span={14}>  <img src={shooting} style={{ width: "100%", height: "100%", display: "flex" }} /></Col>
                                        <Col span={5}></Col>
                                        <Col span={24} ><Typography style={{ textAlign: "center" }}>项目拍摄</Typography></Col>
                                    </Row>

                                </div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={6} style={{ display: 'flex' }}>
                        <Row justify="space-around" align="middle"  >
                            <Col span={1}></Col>
                            <Col span={22} style={{ display: 'flex' }}>
                                <div style={{ width: "100%", display: "flex", border: "1px solid #9A9A9A", borderRadius: "10%" }}>
                                    <Row >
                                        <Col span={24}>&nbsp; </Col>
                                        <Col span={5}></Col>
                                        <Col span={14}>  <img src={setting} style={{ width: "100%", height: "100%", display: "flex" }} /></Col>
                                        <Col span={5}></Col>
                                        <Col span={24} ><Typography style={{ textAlign: "center" }}>系统设置</Typography></Col>
                                    </Row>

                                </div>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default Home;