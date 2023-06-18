import logo from "./icons/logo.png"
import axios from "axios";
import React from "react";
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
                    <Col span={2}> <Button style={{ margin: "0px", padding: "0px" }} size="small" onClick={this.showModal} type="link" danger >清空</Button></Col>
                </Row>
                <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>


            </div>
        )
    }
}

class AlbumType extends React.Component {

    constructor(props) {
        super(props)
        this.state = { albumLists: [] }
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/project")
            .then(res => res.json())
            .then(json => {

                this.setState({
                    albumLists: json.data
                })
            })

    }
    componentDidUpdate() {


    }

    jumpToProjectAlbum = (name) => {
        console.log(name)
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
                                <Col span={20}><Typography style={{ textAlign: "left", color: "#FFFFFF" }}><b>项目拍摄</b></Typography></Col>
                                <Col span={2}></Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


                <div style={{ margin: "0px", padding: "0px", marginTop: "10%",}}>
                    {this.state.albumLists.map(albumLists =>
                        <div style={{ margin: "0px", padding: "0px" }} key={albumLists.name}>
                            <AlbumLists info={albumLists} jumpToProjectAlbum={this.jumpToProjectAlbum}></AlbumLists>
                        </div>)}
                </div>


            </div>
        )
    }
}
AlbumType.contextType = globalProjectDataContext
export default AlbumType;