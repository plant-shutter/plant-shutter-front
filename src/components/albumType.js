import logo from "./icons/logo.png"
import axios from "axios";
import video from "./icons/video.svg"
import photo from "./icons/photo.svg"
import rightArray from "./icons/rightArray.svg"
import url from "../url"
import React from "react";
import { globalProjectDataContext } from "./globalProjectData"
import { Row, Col, Divider, Slider, Button, Input, Select, Space, Progress, Typography, List, Popconfirm, message, Modal, notification } from 'antd';
const { Title } = Typography;

class AlbumType extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deleteImages:false,
            deleteVideos:false,
            video: {
                total: 0,
                totalSize: ""
            }, photo: {
                total: 0,
                totalSize: ""
            }
        }
    }
    componentDidMount() {
        this.init()

    }

    init = () => {
        fetch(url+"/api/project/" + this.context.name + "/video?page=1&page_size=99999999")
            .then(res => res.json())
            .then(json => {

                if (json.status != "success") {
                    window.location.href = window.location.origin + '/#/Album';
                }
                this.setState({
                    video: json.data
                })

            }).catch((response) => {
                window.location.href = window.location.origin + '/#/Album';
            })
        fetch(url+"/api/project/" + this.context.name + "/image?page=1&page_size=99999999")
            .then(res => res.json())
            .then(json => {

                if (json.status != "success") {
                    window.location.href = window.location.origin + '/#/Album';
                }
                this.setState({
                    photo: json.data
                })

            }).catch((response) => {
                window.location.href = window.location.origin + '/#/Album';
            })
    }

    componentDidUpdate() {

    }

    jumpToProjectAlbums = () => {
        window.location.href = window.location.origin + '/#/Album';
    };
    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';
    }

    jumpToVideoList = () => {
        if (this.state.video.total != 0) {
            window.location.href = window.location.origin + '/#/VideoList';
        }

    };

    jumpToImageList = () => {
        if (this.state.photo.total != 0) {
            window.location.href = window.location.origin + '/#/ImageList';
        }

    };


    handleDeleteVideos = () => {
        axios({
            method: 'DELETE', // 请求类型
            url: url+'/api/project/'+this.context.name+"/video", // 请求 url
        }).then(response => {
            this.init()

        }).catch((response) => {
            
        });
      

        this.setState({
            deleteVideos: false,
        });

    };
    handleCancelDeleteVideos = () => {

        this.setState({
            deleteVideos: false,
        });

    };

    showDeleteVideosModal = () => {
        this.setState({
            deleteVideos: true,
        });
    };

    handleDeleteImages = () => {
        
        axios({
            method: 'DELETE', // 请求类型
            url: url+'/api/project/'+this.context.name+"/image", // 请求 url
        }).then(response => {
            this.init()

        }).catch((response) => {
            
        });
      

        this.setState({
            deleteImages: false,
        });

    };
    handleCancelDeleteImages = () => {

        this.setState({
            deleteImages: false,
        });

    };

    showDeleteImagesModal = () => {
        this.setState({
            deleteImages: true,
        });
    };


    render() {
        return (
            <div>

                <Modal
                    title="清空预览视频"
                    open={this.state.deleteVideos}
                    onOk={this.handleDeleteVideos}
                    onCancel={this.handleCancelDeleteVideos}
                >
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22} style={{ color: "red" }}>*注意此项目预览视频将被永久删除!</Col>
                        <Col span={1}></Col>
                    </Row>
                </Modal>

                <Modal
                    title="清空图片序列"
                    open={this.state.deleteImages}
                    onOk={this.handleDeleteImages}
                    onCancel={this.handleCancelDeleteImages}
                >
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22} style={{ color: "red" }}>*注意此项目图片序列将被永久删除!</Col>
                        <Col span={1}></Col>
                    </Row>
                </Modal>

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
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>{this.context.name}</Typography>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


                <div style={{ margin: "0px", padding: "0px", marginTop: "10%", }}>

                    <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
                    <Row>
                        <Col onClick={this.jumpToVideoList} span={5} style={{ margin: "0", padding: "0", paddingLeft: "2%" }} >
                            <div style={{ width: "75%" }}>
                                <img src={video} style={{ width: "100%", height: "100%", display: "flex" }} />
                            </div>
                        </Col>
                        <Col onClick={this.jumpToVideoList} span={17}>
                            <Row>
                                <Col span={24}><Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", marginTop: "1%" }} level={5}><div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>预览视频</div></Title>    </Col>
                            </Row>
                            <Row>
                                <Col span={24}><Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.video.total} 个项目 - {this.state.video.totalSize}</Typography> </Col>
                            </Row>


                        </Col>
                        <Col span={2}> <Button  onClick={this.showDeleteVideosModal} style={{ margin: "0px", padding: "0px", marginTop: "50%" }} size="small"  type="link" danger >清空</Button></Col>
                    </Row>
                    <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
                    <Row>
                        <Col onClick={this.jumpToImageList} span={5} style={{ margin: "0", padding: "0", paddingTop: "3%", paddingLeft: "3%", paddingBottom: "3%" }} >
                            <div style={{ width: "50%" }}>
                                <img src={photo} style={{ width: "100%", height: "100%", display: "flex" }} />
                            </div>
                        </Col>
                        <Col onClick={this.jumpToImageList} span={17}>
                            <Row>
                                <Col span={24}><Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", marginTop: "1%" }} level={5}><div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>图片序列</div></Title>  </Col>
                            </Row>
                            <Row>
                                <Col span={24}><Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.photo.total} 张图片 - {this.state.photo.totalSize}</Typography> </Col>
                            </Row>
                        </Col>
                        <Col span={2}> <Button style={{ margin: "0px", padding: "0px", marginTop: "50%" }} size="small" onClick={this.showDeleteImagesModal} type="link" danger >清空</Button></Col>
                    </Row>
                    <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
                </div>
            </div>
        )
    }
}
AlbumType.contextType = globalProjectDataContext
export default AlbumType;