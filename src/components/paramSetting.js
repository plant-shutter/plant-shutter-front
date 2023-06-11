import React from "react";
import axios from "axios";
import { Row, Col, Divider, Slider, Button, InputNumber, Select, Space, Typography } from 'antd';
import logo from "./icons/logo.png"

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
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {
            console.log(response.data)
        })
    }

    handleChange = (value) => {
        let data = {
            ID: this.props.info.ID,
            value: parseInt(value)
        }
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
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


class ParamSetting extends React.Component {
    constructor(props) {
        super(props)
        this.state = { para: [] }
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/device/config")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    para: json.data
                })
            })

    }
    componentDidUpdate() {


    }
    testjump() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';

    }
    frameRateChange = (value) => {
        console.log(value)
    };

    render() {
        this.W = document.documentElement.clientWidth
        return (
            <div>
                <Row style={{ position: "fixed", zIndex: "1", top: "0px", left: "0px",width: "100%" }}>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#000000", padding: "1%",width: "100%" }}>
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

                <Row style={{ marginTop: "86%" }}>
                    <Col span={1}></Col>
                    <Col span={19}><Typography style={{ textAlign: "left", fontSize: "14px" }}><b>拍摄参数设置</b></Typography></Col>
                    <Col span={4}><Button style={{ color: "#00C2FF" }} size="small" onClick={this.testjump} >重置</Button></Col>

                </Row>
                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>


                <div style={{ marginBottom: '30px' }}>
                    {this.state.para.map(para =>
                        <div key={para.ID}>
                            <Setbox info={para}></Setbox>
                        </div>)}

                </div>
                <Row >
                    <Col span={1}></Col>
                    <Col span={19}><Typography style={{ textAlign: "left", fontSize: "14px" }}><b>预合成视频设置</b></Typography></Col>
                    <Col span={4}><Button style={{ color: "#00C2FF" }} size="small" onClick={this.testjump} >重置</Button></Col>

                </Row>
                <Divider style={{ margin: "0", marginTop: "1%",marginBottom:"3%" }} orientation="left"></Divider>

                <Row justify="space-around" align="middle" >
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                        <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left" ,margin:"2%"}} >帧率</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >
                                <InputNumber min={1} max={10} defaultValue={3} onChange={this.frameRateChange} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                        <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left",margin:"2%"}}>视频分段预览(秒)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >
                                <InputNumber min={1} max={100} defaultValue={10} onChange={this.frameRateChange} />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>&nbsp;</Col>
                </Row>

                <Row justify="space-around" align="middle">
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                        <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left",margin:"2%"}} >拍摄约(天)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around">
                                <InputNumber min={1} max={10} defaultValue={3} onChange={this.frameRateChange} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                            <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left",margin:"2%"}}>视频长约(分)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >
                                <InputNumber min={1} max={100} defaultValue={10} onChange={this.frameRateChange} />
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Divider style={{ margin: "0", marginTop: "3%" ,marginBottom:"3%"}} orientation="left"></Divider>
                <Row style={{ padding: "5%" }} >
                    <Col span={6}></Col>
                    <Col span={12} style={{ borderRadius: "10px", background: "#E5F4FF" }}>
                        <div style={{ textAlign: "center", whiteSpace: "nowrap", margin: "5%", color: "#1684FC", background: "#E5F4FF" }}><b>设置完成准备拍摄</b></div>
                    </Col>
                    <Col span={6}></Col>

                </Row>

                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>





            </div>
        )
    }
}

export default ParamSetting;