import React from "react";
import axios from "axios";
import { Row, Col, Divider, Slider, Button, InputNumber, Select, message, Typography } from 'antd';
import logo from "./icons/logo.png"
import rightArray from "./icons/rightArray.svg"
import { globalProjectDataContext } from "./globalProjectData"
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
            console.log(response)
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
            console.log(response)
        })
    };


    render() {

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
            // var defaultvalue = this.props.info.menuItems[this.props.info.value]
            // var data = []
            // for (var key in this.props.info.menuItems) {
            //     let p = { value: key, label: this.props.info.menuItems[key] }
            //     data.push(p)
            // }
            // return (
            //     <div>
            //         <Row justify="space-around" align="middle">
            //             <Col span={1}> </Col>
            //             <Col span={18}>{this.props.info.name}</Col>
            //             <Col span={4}></Col>
            //             <Col span={1}></Col>
            //         </Row>
            //         <Row justify="space-around" align="middle">
            //             <Col span={1}> </Col>
            //             <Col span={23}>
            //                 <Select
            //                     defaultValue={defaultvalue}
            //                     style={{ width: 120 }}
            //                     onChange={this.handleChange}
            //                     options={data}
            //                 />
            //             </Col>

            //         </Row>

            //     </div>
            // )

        }

    }
}

class ParamSetting extends React.Component {

    constructor(props) {
        super(props)
        this.state = { para: [], frameRate: 30, NumberOfShootingDays: 6.5, TotalVideoLength: 2.5, PreviewVideoLength: 15, interval: 134400, maxImage: 450 }
    }

    componentDidMount() {
        this.init()

    }
    init = () => {


        let datas = [
            {
                ID: 10094849,
                value: 1
            },
            {
                ID: 10094868,
                value: 0
            },
            {
                ID: 10094872,
                value: 0
            },
            {
                ID: 9963807,
                value: 0
            },
            {
                ID: 9963776,
                value: 50
            },
            {
                ID: 9963807,
                value: 0
            }
        ]
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

            fetch("http://raspberrypi:9999/api/device/config")
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        para: json.data
                    })
                    if (this.context.name == "") {
                        window.location.href = window.location.origin + '/#/Home';
                    }
                }).catch((response) => {
                    window.location.href = window.location.origin + '/#/Home';
                })

            fetch("http://raspberrypi:9999/api/project/running")
                .then(res => res.json())
                .then(json => {
                    if (json.data == undefined) {

                    } else {
                        window.location.href = window.location.origin + '/#/Home';
                    }

                }).catch((response) => {

                });


        }).catch((response) => {
            window.location.href = window.location.origin + '/#/Home';
        })


    }
    componentDidUpdate() {
        this.VideoParameterCalculation()
    }
    testjump() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToViewFinder() {

        window.location.href = window.location.origin + '/#/ViewFinder';

    }

    jumpToProjects() {

        window.location.href = window.location.origin + '/#/Projects';

    }

    frameRateChange = (value) => {
        this.setState({
            frameRate: value
        })

    };

    NumberOfShootingDaysChange = (value) => {
        if (value != null) {
            this.setState({
                NumberOfShootingDays: value
            })
        }


    }
    TotalVideoLengthChange = (value) => {
        if (value != null) {
            this.setState({
                TotalVideoLength: value
            })
        }
    }
    PreviewVideoLengthChange = (value) => {
        if (value != null) {
            this.setState({
                PreviewVideoLength: value
            })
        }

    }
    info = (msg) => {
        message.info(msg);
    };

    VideoParameterCalculation = () => {
        let setdata = true
        let interval = 3000
        let maxImage = 10
        interval = 1000 * (this.state.NumberOfShootingDays * 1440) / (this.state.frameRate * this.state.TotalVideoLength)
        interval= Math.ceil(interval)
        console.log(interval)
        maxImage = this.state.PreviewVideoLength * this.state.frameRate

        if (maxImage != this.state.maxImage) {
            this.setState({
                maxImage: maxImage
            })

        }
        if (interval != this.state.interval) {
            this.setState({
                interval: interval
            })
            if (interval <= 3000 &&interval>300) {
                this.info('拍摄天数过短且视频总时长过长将影响拍摄效果')
            }
            if (interval <= 300) {
                setdata=false
                this.setState({
                    TotalVideoLength: (1440000*this.state.NumberOfShootingDays)/(300*this.state.frameRate)
                })
                this.info('拍摄天数与视频总时长比例过小,程序已自动调整视频成片总时长')
            }

        }


        if (setdata == true) {
            let data = {
                "name": this.context.name,
                "running": false,
                "video": {
                    "enable": true,
                    "fps": this.state.frameRate,
                    "maxImage": maxImage
                },
                "interval": interval,

            }

            axios({
                method: 'PUT', // 请求类型
                url: 'http://raspberrypi:9999/api/project', // 请求 url
                data: data
            }).then(response => {

            }).catch((response) => {
                console.log(data)
                console.log(response)

            });
        }


    }

    resetVideoParam = () => {
        this.setState({
            PreviewVideoLength: 15,
            TotalVideoLength: 2.5,
            frameRate: 30,
            NumberOfShootingDays: 6.5,
        })
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
                                    <Typography onClick={this.jumpToProjects} style={{ textAlign: "left", color: "#FFFFFF", fontSize: "16px" }}>项目拍摄</Typography>
                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography onClick={this.jumpToViewFinder} style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>{this.context.name}</Typography>

                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", fontSize: "16px" }}>参数设置</Typography>

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
                    <Col span={4}><Button style={{ color: "#00C2FF" }} size="small" onClick={this.resetVideoParam} >重置</Button></Col>

                </Row>
                <Divider style={{ margin: "0", marginTop: "1%", marginBottom: "3%" }} orientation="left"></Divider>

                <Row justify="space-around" align="middle" >
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                            <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left", margin: "2%" }} >帧率</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >

                                <Select
                                    defaultValue='30帧'
                                    value={this.state.frameRate}
                                    style={{ width: 120 }}
                                    onChange={this.frameRateChange}
                                    options={[
                                        { value: 24, label: '24帧' },
                                        { value: 30, label: '30帧' },
                                        { value: 60, label: '60帧' },
                                        { value: 120, label: '120帧' },
                                        { value: 240, label: '240帧' },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                            <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left", margin: "2%" }}>分段预览视频(秒)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >
                                <InputNumber min={1} max={300} defaultValue={15} onChange={this.PreviewVideoLengthChange} value={this.state.PreviewVideoLength} />
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
                            <Col span={20} style={{ textAlign: "left", margin: "2%" }} >拍摄时间约(天)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around">
                                <InputNumber min={0.001} max={100000} defaultValue={6.5} onChange={this.NumberOfShootingDaysChange} value={this.state.NumberOfShootingDays} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="space-around" align="middle">
                            <Col span={4}></Col>
                            <Col span={20} style={{ textAlign: "left", margin: "2%" }}>视频成片总时长约(分)</Col>
                            <Col span={2}></Col>
                            <Col span={22} justify="space-around" >
                                <InputNumber min={0.02} max={1000} defaultValue={2.5} onChange={this.TotalVideoLengthChange} value={this.state.TotalVideoLength} />
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Divider style={{ margin: "0", marginTop: "3%", marginBottom: "3%" }} orientation="left"></Divider>
                <Row style={{ padding: "5%" }} >
                    <Col span={6}></Col>
                    <Col span={12} style={{ borderRadius: "10px", background: "#E5F4FF" }} onClick={this.jumpToViewFinder}>
                        <div style={{ textAlign: "center", whiteSpace: "nowrap", margin: "5%", color: "#1684FC", background: "#E5F4FF" }}><b>设置完成准备拍摄</b></div>
                    </Col>
                    <Col span={6}></Col>
                </Row>

                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>




            </div>
        )
    }
}
ParamSetting.contextType = globalProjectDataContext
export default ParamSetting;