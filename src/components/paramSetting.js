import React from "react";
import axios from "axios";
import { Row, Col, Divider, Slider, Button, InputNumber, Select, message, Typography } from 'antd';
import logo from "./icons/logo.png"
import rightArray from "./icons/rightArray.svg"
import { globalProjectDataContext } from "./globalProjectData"
const { Title } = Typography;


class ParamSetting extends React.Component {

    constructor(props) {
        super(props)
        this.state = { JpgQuality:50,setted: true, RedBalance: 1580, BlueBalance: 1580, ExposureTime: 1000, previousError: 0, integral: 0, para: [], frameRate: 30, NumberOfShootingDays: 6.5, TotalVideoLength: 2.5, PreviewVideoLength: 15, interval: 124800, maxImage: 450 }
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
            },
            {
                ID: 10094871,
                value: 1
            },
            {
                ID: 9963777,
                value: 0
            },
            {
                ID: 9963778,
                value: 0
            },
            {
                ID: 9963818,
                value: 32896
            },


        ]
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

            fetch("http://raspberrypi:9999/api/project/" + this.context.name)
                .then(res => res.json())
                .then(json => {

                    this.setState({
                        frameRate:json.data.video.fps,
                        PreviewVideoLength:json.data.video.previewVideoLength,
                        TotalVideoLength:json.data.video.totalVideoLength,
                        NumberOfShootingDays:json.data.video.shootingDays,
                    })
                    for (let key in json.data.camera) {
                        if (key == "9963790") {
                            this.setState({
                                RedBalance: json.data.camera[key]
                            })
                        }
                        if (key == "9963791") {
                            this.setState({
                                BlueBalance: json.data.camera[key]
                            })
                        }
                        if (key == "10094850") {
                            this.setState({
                                ExposureTime: json.data.camera[key]
                            })
                        }
                        if (key == "10291459") {
                            this.setState({
                                JpgQuality: json.data.camera[key]
                            })
                        }

                    }


                }).catch((response) => {
                    window.location.href = window.location.origin + '/#/Home';
                })

            //查询正在拍摄的项目
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


    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToViewFinder = () => {

        window.location.href = window.location.origin + '/#/ViewFinder';

    }
    setProjectParams = () => {
        let data = {
            name: this.context.name,
            camera: true
        }
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/project', // 请求 url
            data: data
        }).then(response => {

            this.jumpToViewFinder()

        }).catch((response) => {
            this.info('另一个项目正在拍摄中,无法同时拍摄两个项目')
        });


    }

    jumpToProjects() {

        window.location.href = window.location.origin + '/#/Projects';

    }

    frameRateChange = (value) => {
        let data = value
        this.setState({
            frameRate: data,
            setted: true,
        }, () => {
            this.VideoParameterCalculation()
        })


    };

    NumberOfShootingDaysChange = (value) => {
        if (value != null) {

            this.setState({
                NumberOfShootingDays: value,
                setted: true,
            }, () => {
                this.VideoParameterCalculation()
            })
        }

    }
    TotalVideoLengthChange = (value) => {
        if (value != null) {

            this.setState({
                TotalVideoLength: value,
                setted: true,
            }, () => {
                this.VideoParameterCalculation()
            })
        }

    }
    PreviewVideoLengthChange = (value) => {
        if (value != null) {

            this.setState({
                PreviewVideoLength: value,
                setted: true,
            }, () => {
                this.VideoParameterCalculation()
            })
        }

    }
    info = (msg) => {
        message.info(msg);
    };

    resetVideoParam = () => {
        this.setState({
            PreviewVideoLength: 15,
            TotalVideoLength: 2.5,
            frameRate: 30,
            NumberOfShootingDays: 6.5,
            setted: true,
        }, () => {
            this.VideoParameterCalculation()
        })
    }

    VideoParameterCalculation = () => {
        let setdata = true
        let interval = 3000
        let maxImage = 10
        interval = 1000 * (this.state.NumberOfShootingDays * 1440) / (this.state.frameRate * this.state.TotalVideoLength)
        interval = Math.ceil(interval)
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
            if (interval <= 3000 && interval > 300) {
                this.info('拍摄天数过短且视频总时长过长将影响拍摄效果')
            }
            if (interval <= 300) {
                setdata = false
                this.setState({
                    TotalVideoLength: (1440000 * this.state.NumberOfShootingDays) / (300 * this.state.frameRate)
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
                    "maxImage": maxImage,
                    "previewVideoLength":this.state.PreviewVideoLength,
                    "shootingDays":this.state.NumberOfShootingDays,
                    "totalVideoLength":this.state.TotalVideoLength,
                },
                "interval": interval,

            }

            axios({
                method: 'PUT', // 请求类型
                url: 'http://raspberrypi:9999/api/project', // 请求 url
                data: data
            }).then(response => {

            }).catch((response) => {


            });
        }

    }


    AutoExposure = (imageData) => {
        var data = imageData.data;
        var numPixels = data.length / 4; // 每个像素有4个分量（RGBA）

        // 计算图像的平均亮度
        var sumBrightness = 0;
        for (var i = 0; i < data.length; i += 4) {
            var red = data[i];
            var green = data[i + 1];
            var blue = data[i + 2];
            var brightness = (red + green + blue) / 3;
            sumBrightness += brightness;
        }
        var averageBrightness = sumBrightness / numPixels;

        // 内置目标亮度范围和最大曝光时间
        var targetBrightness = 65; // 目标亮度
        var maxExposureTime = 300; // 曝光时间范围为0-10000000us

        // 内置PID控制参数
        var Kp = 0.4; // 比例增益
        var Ki = 0.5; // 积分增益
        var Kd = 0; // 微分增益


        // 计算误差
        var error = targetBrightness - averageBrightness;
        // console.log("error" + error)
        // 更新PID控制器的状态变量
        this.setState({
            integral: this.state.integral + error
        })

        var derivative = error - this.state.previousError;
        var output = Kp * error + Ki * this.state.integral + Kd * derivative;

        // 计算新的曝光时间
        var newExposureTime = Math.max(1, Math.min(maxExposureTime, output));

        // 更新上一次的误差
        this.setState({
            previousError: error
        })

        var exposureTime = Math.ceil(newExposureTime)
        this.setState({
            ExposureTime: exposureTime
        })

        data = {
            ID: 10094850,
            value: exposureTime
        }


        return data
    }

    AutoParams = () => {

        const img = document.getElementById('originalImage');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // 设置 canvas 的宽高与图像相同
        canvas.width = img.width;
        canvas.height = img.height;

        // 将图像绘制到 canvas
        context.drawImage(img, 0, 0);

        // 获取图像数据
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        this.setState({
            RedBalance: 1580,
            BlueBalance: 1580
        })
        let ExposureData = this.AutoExposure(imageData)
        let datas = [
            {
                ID: 9963791,
                value: 1580
            },
            {
                ID: 9963790,
                value: 1580
            }
        ]
        datas.push(ExposureData)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {
            // console.log(response)
        }).catch((response) => {
            // console.log(response)
        })
    }

    ChangeExposureTime = (value) => {
        this.setState({
            ExposureTime: value
        })

    }
    AfterChangeExposureTime = (value) => {

        this.setState({
            ExposureTime: value
        })
        let data = {
            ID: 10094850,
            value: value
        }
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

        })
    }


    ChangeRedBalance = (value) => {
        this.setState({
            RedBalance: value
        })

    }
    AfterChangeRedBalance = (value) => {

        this.setState({
            RedBalance: value
        })
        let data = {
            ID: 9963790,
            value: value
        }
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

        })
    }


    ChangeBlueBalance = (value) => {
        this.setState({
            BlueBalance: value
        })

    }
    AfterChangeBlueBalance = (value) => {

        this.setState({
            BlueBalance: value
        })
        let data = {
            ID: 9963791,
            value: value
        }
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

        })
    }

    ChangeJpgQuality = (value) => {
        this.setState({
            JpgQuality: value
        })

    }
    AfterChangeJpgQuality = (value) => {

        this.setState({
            JpgQuality: value
        })
        let data = {
            ID: 10291459,
            value: value
        }
        let datas = []
        datas.push(data)
        axios({
            method: 'PUT', // 请求类型
            url: 'http://raspberrypi:9999/api/device/config', // 请求 url
            data: datas
        }).then(response => {

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
                            <Col span={24}><img id="originalImage" crossOrigin="anonymous" style={{ width: "100%", height: "100%" }} src="http://raspberrypi:9999/api/device/realtime/video" alt="video"></img></Col>
                        </Row>
                    </Col>
                </Row>

                <Row style={{ marginTop: "86%" }}>
                    <Col span={1}></Col>
                    <Col span={18}><Typography style={{ textAlign: "left", fontSize: "14px" }}><b>拍摄参数设置</b></Typography></Col>
                    <Col span={5}><Button style={{ color: "#00C2FF" }} size="small" onClick={this.AutoParams} >自动调整</Button></Col>

                </Row>
                <Divider style={{ margin: "0", marginTop: "1%" }} orientation="left"></Divider>

                <div style={{ marginBottom: '30px' }}>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>曝光时间(us)</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}>
                            <Slider
                                defaultValue={this.state.ExposureTime}
                                value={this.state.ExposureTime}
                                max={300}
                                min={1}
                                onChange={this.ChangeExposureTime}
                                onAfterChange={this.AfterChangeExposureTime} />
                        </Col>
                        <Col span={1}> </Col>
                    </Row>

                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>红色增益</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}>
                            <Slider
                                tipFormatter={(value) => `${value / 1000}`}
                                defaultValue={this.state.RedBalance}
                                value={this.state.RedBalance}
                                max={7999}
                                min={1}
                                onChange={this.ChangeRedBalance}
                                onAfterChange={this.AfterChangeRedBalance} />
                        </Col>
                        <Col span={1}> </Col>
                    </Row>

                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>蓝色增益</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}>
                            <Slider
                                tipFormatter={(value) => `${value / 1000}`}
                                defaultValue={this.state.BlueBalance}
                                value={this.state.BlueBalance}
                                max={7999}
                                min={1}
                                onChange={this.ChangeBlueBalance}
                                onAfterChange={this.AfterChangeBlueBalance} />
                        </Col>
                        <Col span={1}> </Col>
                    </Row>

                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={18}>图像质量</Col>
                        <Col span={4}></Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Col span={1}> </Col>
                        <Col span={22}>
                            <Slider
                                tipFormatter={(value) => `${value }%`}
                                defaultValue={this.state.JpgQuality}
                                value={this.state.JpgQuality}
                                max={100}
                                min={1}
                                onChange={this.ChangeJpgQuality}
                                onAfterChange={this.AfterChangeJpgQuality} />
                        </Col>
                        <Col span={1}> </Col>
                    </Row>

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
                    <Col span={12} style={{ borderRadius: "10px", background: "#E5F4FF" }} onClick={this.setProjectParams}>
                        <div style={{ textAlign: "center", whiteSpace: "nowrap", margin: "5%", color: "#1684FC", background: "#E5F4FF" }}><b>保存设置准备拍摄</b></div>
                    </Col>
                    <Col span={6}></Col>
                </Row>



            </div>
        )
    }
}
ParamSetting.contextType = globalProjectDataContext
export default ParamSetting;