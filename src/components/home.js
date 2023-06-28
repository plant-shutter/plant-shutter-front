import album from "./icons/album.svg"
import shooting from "./icons/shooting.svg"
import setting from "./icons/setting.svg"
import logo from "./icons/logo.png"
import url from "../url"
import axios from "axios";
import React from "react";
import { Image, Row, Col, Divider, Slider, Button, InputNumber, Select, Space, Progress, Typography, List, Popconfirm, message } from 'antd';
const { Title } = Typography;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dist: {}, memory: {} }
    }
    componentDidMount() {

        this.init()

    }
    componentWillUnmount() {

        clearInterval(this.looptimer)
    }

    init = () => {
        var now = new Date();

        // 将时间转化为指定格式
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var day = ('0' + now.getDate()).slice(-2);
        var hours = ('0' + now.getHours()).slice(-2);
        var minutes = ('0' + now.getMinutes()).slice(-2);
        var seconds = ('0' + now.getSeconds()).slice(-2);
        
        // 设置时区为上海（CST，UTC+8）
        var timezoneOffset = 8;
        var timezoneOffsetString = '+' + ('0' + Math.abs(timezoneOffset)).slice(-2) + ':00';
        
        var formattedTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + timezoneOffsetString;

        axios({
            method: 'PUT', // 请求类型
            url: url+'/api/device/date', // 请求 url
            data:{
                "newTime": formattedTime
            }
        }).then(response => {

        }).catch((response) => {
            
        })
    }

    componentDidUpdate() {


    }
    jumpToProjects() {

        window.location.href = window.location.origin + '/#/Projects';

    }
    jumpToAlbum() {
        window.location.href = window.location.origin + '/#/Album';
    }

    jumpToSet() {
        window.location.href = window.location.origin + '/#/Set';
    }

    render() {

        return (
            <div>
                <Row style={{ position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%" }}>
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
                                <Col span={20}><Typography style={{ textAlign: "center", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>plant-shutter</Typography></Col>
                                <Col span={2}></Col>

                            </Row>

                        </div>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={24}><img style={{ width: "100%", height: "100%" }} src={url + "/api/device/realtime/video"} alt="video"></img></Col>
                        </Row>
                    </Col>
                </Row>

                <Divider style={{ margin: "1", marginTop: "86%" }} orientation="left"></Divider>
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
                                        <Col span={14}>  <img src={album} style={{ width: "100%", height: "100%", display: "flex" }} onClick={this.jumpToAlbum} /></Col>
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
                                        <Col span={14}>  <img src={shooting} style={{ width: "100%", height: "100%", display: "flex" }} onClick={this.jumpToProjects} /></Col>
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
                                        <Col span={14}>  <img src={setting} style={{ width: "100%", height: "100%", display: "flex" }} onClick={this.jumpToSet} /></Col>
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