import logo from "./icons/logo.png"
import React from "react";
import axios from "axios";
import rightArray from "./icons/rightArray.svg"
import url from "../url"
import { globalProjectDataContext } from "./globalProjectData"
import { Image, Row, Col, Divider, Slider, Button, Input, Select, Space, Progress, Typography, List, Popconfirm, message, Modal, notification } from 'antd';
const { Title } = Typography;


class AlbumLists extends React.Component {
    constructor(props) {
        super(props)
        var date = new Date(this.props.info.createdAt);

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

    render() {

        return (
            <div style={{ margin: "0px", padding: "0px" }}>
                <Row style={{ margin: "0px", padding: "0px" }} justify="space-around" align="middle" >
                    <Col span={22} style={{ margin: "0px", padding: "0px" }} onClick={() => this.props.jumpToProjectAlbum(this.props.info.name)}>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={15}> <Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis" }} level={5}><div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.props.info.name}</div></Title> </Col>

                                    <Col span={5}></Col>

                                    <Col span={2}></Col>
                                </Row>

                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={12}> <Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.date}</Typography> </Col>
                                    <Col span={2}></Col>
                                    <Col span={9}><Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.props.info.diskUsage}</Typography> </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={2}> <Button style={{ margin: "0px", padding: "0px" }} size="small" onClick={() => this.props.deleteAlbum(this.props.info.name)} type="link" danger >清空</Button></Col>
                </Row>
                <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>


            </div>
        )
    }
}

class Album extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { albumLists: [], deleteAlbum: false, AlbumToBeDeleted: "" }
    }
    componentDidMount() {
        this.enterFullscreen()
        this.init()

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
    init = () => {
        fetch(url+"/api/project")
            .then(res => res.json())
            .then(json => {
                if (json.status == "error") {
                    console.log(json)
                } else {
                    this.setState({
                        albumLists: json.data
                    })
                }


            }).catch((response) => {


            });
    }
    componentDidUpdate() {
    }

    jumpToProjectAlbum = (name) => {
        this.context.setprojectname(name)

        window.location.href = window.location.origin + '/#/AlbumType';
    };
    jumpToHome() {
        window.location.href = window.location.origin + '/#/Home';
    }

    handleDeleteAlbum = () => {

        axios({
            method: 'DELETE', // 请求类型
            url: url+'/api/project/' + this.state.AlbumToBeDeleted + "/image", // 请求 url
        }).then(response => {
            axios({
                method: 'DELETE', // 请求类型
                url: url+'/api/project/' + this.state.AlbumToBeDeleted + "/video", // 请求 url
            }).then(response => {
                this.init()
            }).catch((response) => {

            });

        }).catch((response) => {

        });


        this.setState({
            deleteAlbum: false,
        });

    };
    handleCancelDeleteAlbum = () => {

        this.setState({
            deleteAlbum: false,
        });

    };

    showDeleteAlbumModal = (value) => {

        this.setState({
            deleteAlbum: true,
            AlbumToBeDeleted: value,
        });
    };
    render() {
        return (
            <div>
                <Modal
                    title="清空相册"
                    open={this.state.deleteAlbum}
                    onOk={this.handleDeleteAlbum}
                    onCancel={this.handleCancelDeleteAlbum}
                >
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22} style={{ color: "red" }}>*注意此项目预览视频以及图片序列将被永久删除!</Col>
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
                                    <Typography style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>相册浏览</Typography>



                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Divider style={{ margin: "0", padding: "0", marginTop: "10%", }} orientation="left">项目相册列表</Divider>
                <div style={{ margin: "0px", padding: "0px" }}>
                    {this.state.albumLists.map(albumLists =>
                        <div style={{ margin: "0px", padding: "0px" }} key={albumLists.name}>
                            <AlbumLists info={albumLists} jumpToProjectAlbum={this.jumpToProjectAlbum} deleteAlbum={this.showDeleteAlbumModal}></AlbumLists>
                        </div>)}
                </div>

            </div>
        )
    }
}
Album.contextType = globalProjectDataContext
export default Album;