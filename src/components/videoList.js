import logo from "./icons/logo.png"
import axios from "axios";
import rightArray from "./icons/rightArray.svg"
import React from "react";
import { globalProjectDataContext } from "./globalProjectData"
import { Image, Row, Col, Divider, Slider, Button, Input, Select, Space, Progress, Typography, List, Popconfirm, message, Modal, notification } from 'antd';
const { Title } = Typography;

class VideoEntries extends React.Component {
    constructor(props) {
        super(props)
        var date = new Date(this.props.info.modTime);
        // 提取所需的年、月、日、小时、分钟和秒
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);
        var second = ("0" + date.getSeconds()).slice(-2);

        // 构造最终的时间字符串
        var outputTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        this.state = { date: outputTime }
    }
    deleteVideo=()=>{
        axios({
            method: 'DELETE', // 请求类型
            url: 'http://raspberrypi:9999/api/project/'+this.props.projectName+"/video/"+this.props.info.name, // 请求 url
        }).then(response => {
            this.props.init()

        }).catch((response) => {
            
        });
     
    }

    render() {
        return (
            <div style={{ margin: "0px", padding: "0px" }}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={19}>
                        <a href={"http://raspberrypi:9999/api/" + this.props.info.name}></a>
                        <Row>
                            <Col span={24}>
                                <Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", marginTop: "1%" }} level={5}>
                                    <div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        <a style={{ color: "#000000" }} href={"http://raspberrypi:9999/api/project/" + this.props.projectName + "/video/" + this.props.info.name}> {this.props.info.name}</a>
                                    </div>
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Col span={24}><Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.date} - {this.props.info.size}</Typography> </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}><Button style={{ margin: "0px", padding: "0px", marginTop: "40%" }} size="small" onClick={this.deleteVideo} type="link" danger >删除</Button></Col>
                    <Col span={1}></Col>
                </Row>
                <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
            </div>
        )
    }
}

class VideoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            video: {
                video: []
            }
        }
    }
    componentDidMount() {

      this.init()

    }

    init=()=>{
        fetch("http://raspberrypi:9999/api/project/" + this.context.name + "/video?page=1&page_size=99999999")
        .then(res => res.json())
        .then(json => {
           
            if (json.status != "success" || json.data.total==0) {
                window.location.href = window.location.origin + '/#/Album';
            }
            this.setState({
                video: json.data
            })


        }).catch((response) => {
            window.location.href = window.location.origin + '/#/Album';
        })
    }

    componentDidUpdate() {

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


    render() {
  
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
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>预览视频</Typography>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


                <div style={{ margin: "0px", padding: "0px", marginTop: "10%", }}>

                    {this.state.video.video.map(videoEntries =>
                        <div style={{ margin: "0px", padding: "0px" }} key={videoEntries.name}>
                            <VideoEntries info={videoEntries} projectName={this.context.name} init={this.init}></VideoEntries>
                        </div>)}
                </div>
            </div>
        )
    }
}
VideoList.contextType = globalProjectDataContext
export default VideoList;