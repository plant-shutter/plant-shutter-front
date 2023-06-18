import VerifyStopRecord from "./verifyStopRecord.tsx"
import React from "react";
import axios from "axios";
import { Row, Col, Divider, Typography } from 'antd';
import logo from "./icons/logo.png"
import rightArray from "./icons/rightArray.svg"
import reset from "./icons/reset.svg"
import { globalProjectDataContext } from "./globalProjectData"
import setting from "./icons/setting.svg"
const { Title } = Typography;

class Recording extends React.Component {
    constructor(props) {
        super(props)
    }

    StopRecording = () => {
        this.timer = setInterval(() => {
            clearInterval(this.timer)
            this.props.stopREC()
        }, 500);
    };

    render() {
        this.W=document.documentElement.clientWidth/24*16
        return (
            <div style={{ margin: "0px", padding: "0px" ,marginTop:"20%"}}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}> <VerifyStopRecord ref="verify" success={this.StopRecording} width={this.W}></VerifyStopRecord></Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }
}

class StartRecording extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ margin: "0px", padding: "0px" }}>
                <Row style={{ margin: "0", marginTop: "10%" }}>
                    <Col span={9}></Col>
                    <Col span={6} style={{ borderRadius: "10000px", background: "#93D2F3" }} onClick={() => this.props.startREC(this.props.projectname)}>
                        <div style={{ textAlign: "center", margin: "20%", color: "#FFFFFF", background: "#93D2F3", padding: "10%" }}><b>开始拍摄</b></div>
                    </Col>
                    <Col span={9}></Col>
                </Row>
            </div>
        )
    }
}


class ViewFinder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            para: [], UImsg: {
                name: "plantshutter",
                video: {
                    fps: 24
                }
            }
        }
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/device/config")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    para: json.data
                })
            })

        fetch("http://raspberrypi:9999/api/project/" + this.context.name)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    UImsg: json.data
                })

            }).catch((response) => {
                window.location.href = window.location.origin + '/#/Home';
            })


    }
    componentDidUpdate() {

    }
    jumpToProjects() {
        window.location.href = window.location.origin + '/#/Projects';
    }
    jumpToHome() {
        window.location.href = window.location.origin + '/#/Home';
    }
    jumpToParamSetting() {
        window.location.href = window.location.origin + '/#/ParamSetting';
    }

    startREC = () => {
        let data = {
            name: this.state.UImsg.name,
            running: true
        }
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/project', // 请求 url
            data: data
        }).then(response => {

            let UImsg = this.state.UImsg
            UImsg.running = true
            this.setState({
                UImsg: UImsg
            })

        }).catch((response) => {
            
        });

    }

    stopREC = (name) => {

        let data = {
            name: this.state.UImsg.name,
            running: false
        }
        let running=true

        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/project', // 请求 url
            data: data
        }).then(response => {
      
            let UImsg = this.state.UImsg
        
            UImsg.running = false
    
            this.setState({
                UImsg: UImsg
            })
        }).catch((response) => {
            running=true
         
        });



    }

    render() {
   
        return (
            <div>
                <Row style={{ position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%" }}>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#000000", padding: "1%", width: "100%" }}>
                            <Row justify="space-around" align="middle" >
                                <Col span={2} style={{ display: 'flex' }} onClick={this.jumpToHome}>
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
                                    <Typography onClick={this.jumpToProjects} style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>项目拍摄</Typography>

                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", fontSize: "16px" }}>{this.context.name}</Typography>

                                </Col>
                            </Row>

                        </div>

                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={24}><img style={{ width: "100%", height: "100%" }} src="http://raspberrypi:9999/api/device/realtime/video" alt="video"></img></Col>
                        </Row>
                    </Col>
                </Row>

                <Row style={{ margin: "0", marginTop: "86%", padding: "0" }}>
                    <Col span={12}>
                        <Row>
                            <Col span={24}> <Title level={2} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.state.UImsg.imageTotal}</Title></Col>
                            <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>已拍照片数量(张)</Typography></Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}> <Title level={2} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.state.UImsg.time}</Title></Col>
                            <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>拍摄总时长(小时:分钟)</Typography></Col>
                        </Row>
                    </Col>
                </Row>

                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>
                <Row style={{ marginTop: "1%" }}  >
                    <Col span={22}></Col>
                    <Col span={2} onClick={this.jumpToParamSetting}>
                        <Row>
                            <Col span={5}></Col>
                            {this.state.UImsg.name != "plantshutter" && !this.state.UImsg.running ? <Col span={12}> <img src={setting} style={{ width: "100%", height: "100%", display: "flex" }} /></Col> : <Col span={12}></Col>}

                            <Col span={7}></Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.state.UImsg.interval}</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>场景缩时倍数</Typography></Col>
                    </Col>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>4K|{this.state.UImsg.video.fps}</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>视频参数</Typography></Col>
                    </Col>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>18769</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>场景曝光时间(us)</Typography></Col>
                    </Col>
                </Row>


                <Row>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>60</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>场景ISO</Typography></Col>
                    </Col>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>1.34</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>场景蓝色增益</Typography></Col>
                    </Col>
                    <Col span={8}>
                        <Col span={24}> <Title level={3} style={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>1.42</Title></Col>
                        <Col span={24}> <Typography style={{ textAlign: "center", color: "#BBBBBB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>场景红色增益</Typography></Col>
                    </Col>
                </Row>
                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>
                <Row style={{ marginTop: "1%" }}  >
                    <Col span={22}></Col>
                    <Col span={2}>
                        <Row>
                            <Col span={5}></Col>
                            {this.state.UImsg.name != "plantshutter" && !this.state.UImsg.running ? <Col span={14}> <img src={reset} style={{ width: "100%", height: "100%", display: "flex" }} /></Col> : <Col span={14}></Col>}
                            <Col span={5}></Col>
                        </Row>
                    </Col>
                </Row>

                {this.state.UImsg.name != "plantshutter" && !this.state.UImsg.running ? <StartRecording projectname={this.state.UImsg.name} startREC={this.startREC}></StartRecording> : <Recording projectname={this.state.UImsg.name} stopREC={this.stopREC}></Recording>}

            </div>
        )
    }
}
ViewFinder.contextType = globalProjectDataContext
export default ViewFinder;