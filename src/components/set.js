import rightArray from "./icons/rightArray.svg"
import logo from "./icons/logo.png"
import url from "../url"
import React from "react";
import { Image, Row, Col, Divider, Slider, Button, InputNumber, Select, Space, Progress, Typography, List, Popconfirm, message } from 'antd';
const { Title } = Typography;

class Set extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dist: {}, memory: {} }
    }
    componentDidMount() {

        this.enterFullscreen()
        this.loop()
        this.looptimer = setInterval(() => {
            this.loop()
        }, 3000);
    }
    enterFullscreen = () => {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }
    componentWillUnmount() {
        window.stop();
        clearInterval(this.looptimer)
    }

    loop = () => {
        fetch(url + "/api/device/memory")
            .then(res => res.json())
            .then(json => {
                json.data.usedPercent = json.data.usedPercent.toFixed(2)
                this.setState({
                    memory: json.data
                })
            }).catch((response) => {
            });


        fetch(url + "/api/device/disk")
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
    jumpToHome() {
        window.location.href = window.location.origin + '/#/Home';
    }


    render() {

        return (
            <div>
                <Row style={{ position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%" }}>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#000000", padding: "1%" }}>

                            <Row justify="space-around" align="middle" >
                                <Col span={2} style={{ display: 'flex' }} onClick={this.jumpToHome} >
                                    <Row justify="space-around" align="middle"  >
                                        <Col span={24} style={{ display: 'flex' }}>
                                            <div style={{ width: "80%" }}>
                                                <img src={logo} style={{ width: "100%", height: "100%", display: "flex" }} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={22} style={{ display: 'flex' }} >
                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>系统设置</Typography>

                                </Col>
                            </Row>
                        </div>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <img
                                    id="originalImage"
                                 
                                    style={{ width: "100%", height: "100%" }}
                                    src={url + "/api/device/realtime/video"}
                                    alt="video">
                                </img></Col>
                        </Row>
                    </Col>
                </Row>



                <Space direction="vertical" size="small" style={{ display: 'flex', marginTop: "86%" }}>

                    <Divider style={{ margin: "0" }} orientation="left">存储</Divider>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={5}><Progress type="circle" percent={this.state.dist.usedPercent} size={70} /></Col>
                        <Col span={2}></Col>
                        <Col span={15}>
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
                        <Col span={1}></Col>
                    </Row>
                </Space>
                <Space direction="vertical" size="small" style={{ display: 'flex', marginTop: "2%" }}>

                    <Divider style={{ margin: "0" }} orientation="left">运行</Divider>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={5}><Progress type="circle" percent={this.state.memory.usedPercent} size={70} /></Col>
                        <Col span={2}></Col>
                        <Col span={15}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Row >
                                    <Col style={{ margin: "0" }} span={24}>
                                        <Title style={{ margin: "0" }} level={5}>内存空间</Title>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: "0" }} span={24}>
                                        <Title style={{ margin: "0" }} level={5}>剩余{this.state.memory.free}，共{this.state.memory.total}</Title>
                                    </Col>
                                </Row>
                            </Space>

                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </Space>
                <Divider style={{ margin: "1" }} orientation="left"></Divider>


            </div>
        )
    }
}

export default Set;