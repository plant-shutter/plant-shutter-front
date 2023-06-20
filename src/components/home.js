import album from "./icons/album.svg"
import shooting from "./icons/shooting.svg"
import setting from "./icons/setting.svg"
import logo from "./icons/logo.png"

import React from "react";
import { Image, Row, Col, Divider, Slider, Button, InputNumber, Select, Space, Progress, Typography, List, Popconfirm, message } from 'antd';
const { Title } = Typography;

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
            }).catch((response) => {

               
            });

    }
    componentDidUpdate() {


    }
    jumpToProjects() {

        window.location.href = window.location.origin + '/#/Projects';

    }
    jumpToAlbum() {
        window.location.href = window.location.origin + '/#/Album';
    }
    

    render() {

        return (
            <div>
                <Row style={{position:"fixed" ,zIndex:"1",top:"0px",left:"0px",width:"100%"}}>
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
                        <Col span={5}><Progress type="circle" percent={this.state.dist.usedPercent} size={70} /></Col>
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
                                        <Title style={{ margin: "0" }} level={5}>剩余{this.state.dist.free}，共{this.state.dist.total}</Title>
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
                                        <Col span={14}>  <img src={album} style={{ width: "100%", height: "100%", display: "flex" }} onClick={this.jumpToAlbum}  /></Col>
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
                                <div style={{ width: "100%", display: "flex", border: "1px solid #9A9A9A", borderRadius: "10%" }} >
                                    <Row >
                                        <Col span={24}>&nbsp; </Col>
                                        <Col span={5}></Col>
                                        <Col span={14}>  <img src={shooting} style={{ width: "100%", height: "100%", display: "flex" }} onClick={this.jumpToProjects}  /></Col>
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