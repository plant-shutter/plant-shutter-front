import logo from "./icons/logo.png"

import rightArray from "./icons/rightArray.svg"
import React from "react";
import { globalProjectDataContext } from "./globalProjectData"
import { Image, Pagination, Row, Col, Divider, Slider, Button, Input, Select, Space, Progress, Typography, List, Popconfirm, message, Modal, notification } from 'antd';
const { Title } = Typography;

class ImageList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            images: [],
            startedAt: "",
            endedAt: "",
            total: 0,
            totalSize: "",
            current: {
                name: "",
                size: "",
                modTime: "",
                resolution: "3240*2420",
                url: "",
              
            },
            totalpage:0,
        }
    }

    componentDidMount() {

        fetch("http://raspberrypi:9999/api/project/" + this.context.name + "/image?page=1&page_size=99999999")
            .then(res => res.json())
            .then(json => {
                if (json.status != "success") {
                    window.location.href = window.location.origin + '/#/Album';
                }

                for (let i = 0; i < json.data.images.length; i++) {
                    json.data.images[i].modTime = this.timeFormat(json.data.images[i].modTime)
                }
                let current = {
                    name: json.data.images[0].name,
                    size: json.data.images[0].size,
                    modTime: json.data.images[0].modTime,
                    resolution: "3240*2420",
                    url: "http://raspberrypi:9999/api/project/" + this.context.name + "/image/" + json.data.images[0].name,
                    

                }
                this.setState({
                    images: json.data.images,
                    totalSize: json.data.totalSize,
                    current: current,
                    totalpage:(json.data.images.length-1)*10
                })

            }).catch((response) => {
                window.location.href = window.location.origin + '/#/Album';
            })

        fetch("http://raspberrypi:9999/api/project/" + this.context.name)
            .then(res => res.json())
            .then(json => {

                this.setState({
                    startedAt: this.timeFormat(json.data.startedAt),
                    endedAt: this.timeFormat(json.data.endedAt),
                    total: json.data.imageTotal,
                })

            }).catch((response) => {
                window.location.href = window.location.origin + '/#/Album';
            })

    }
    componentDidUpdate() {

    }

    timeFormat = (time) => {
        let createdDate = new Date(time);

        // 提取所需的年、月、日、小时、分钟和秒
        let year = createdDate.getFullYear();
        let month = ("0" + (createdDate.getMonth() + 1)).slice(-2);
        let day = ("0" + createdDate.getDate()).slice(-2);
        let hour = ("0" + createdDate.getHours()).slice(-2);
        let minute = ("0" + createdDate.getMinutes()).slice(-2);
        let second = ("0" + createdDate.getSeconds()).slice(-2);
        // 构造最终的时间字符串
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

    }
    jumpToAlbumType = () => {
        window.location.href = window.location.origin + '/#/AlbumType';
    };
    jumpToProjectAlbums = () => {
        window.location.href = window.location.origin + '/#/Album';
    };
    jumpToHome() {
        window.location.href = window.location.origin + '/#/Home';
    }

    onChange = (num) => {
        
        let current = {
            name: this.state.images[num].name,
            size: this.state.images[num].size,
            modTime: this.state.images[num].modTime,
            resolution: "3240*2420",
            url: "http://raspberrypi:9999/api/project/" + this.context.name + "/image/" + this.state.images[num].name,
        }
        this.setState({

            current: current
        })
    };
    render() {
        console.log(this.state)
        return (
            <div>
                <Row style={{ position: "fixed", zIndex: "1", top: "0px", left: "0px", width: "100%" }}>
                    <Col span={24}>
                        <div style={{ backgroundColor: "#000000", padding: "1%", width: "100%" }}>
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
                                    <Typography onClick={this.jumpToProjectAlbums} style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>相册浏览</Typography>
                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography onClick={this.jumpToAlbumType} style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>{this.context.name}</Typography>
                                    <div style={{ width: "5%" }}>
                                        <img src={rightArray} style={{ width: "100%", height: "100%", display: "flex" }} />
                                    </div>
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>图片预览</Typography>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>



                <Divider style={{ margin: "0", padding: "0", marginTop: "10%", }} orientation="left">序列信息</Divider>
                <Row style={{ margin: "0", padding: "0", marginTop: "2%", }}>
                    <Col span={2}></Col>
                    <Col span={5}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>起始时间：</Typography></Col>
                    <Col span={15}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>{this.state.startedAt}</Typography></Col>
                    <Col span={2}></Col>
                </Row>
                <Row >
                    <Col span={2}></Col>
                    <Col span={5}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>结束时间：</Typography></Col>
                    <Col span={15}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>{this.state.endedAt}</Typography></Col>
                    <Col span={2}></Col>
                </Row>
                <Row >
                    <Col span={2}></Col>
                    <Col span={5}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>数量/空间：</Typography></Col>
                    <Col span={15}><Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>{this.state.total} / {this.state.totalSize}</Typography></Col>
                    <Col span={2}></Col>
                </Row>

                <Divider style={{ margin: "0", padding: "0", marginTop: "2%", }} orientation="left">当前图片</Divider>


                <Row style={{ margin: "0", padding: "0", marginTop: "2%", }}>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>
                            名称：{this.state.current.name}
                        </Typography>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row >
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>
                            分辨率/大小：{this.state.current.resolution} / {this.state.current.size}
                        </Typography>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row >
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Typography style={{ textAlign: "left", color: "#000000", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px" }}>
                            创建时间：{this.state.current.modTime}
                        </Typography>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row style={{ margin: "0", padding: "0", marginTop: "2%", }}>
                    <Col span={24}><img style={{ width: "100%", height: "100%" }} src={this.state.current.url} alt="video"></img></Col>
                </Row>

                <Row style={{ position: "fixed", zIndex: "2", top: "90%",width:"100%" }}>
                    <Col span={24}>
                        <Row  style={{ textAlign:"center" }} >
                         
                            <Col span={24}>  <Pagination   onChange={this.onChange} simple defaultCurrent={0} total={this.state.totalpage} /> </Col>
                         
                        </Row>
                    
                    </Col>
                </Row>

            </div>
        )
    }
}
ImageList.contextType = globalProjectDataContext
export default ImageList;