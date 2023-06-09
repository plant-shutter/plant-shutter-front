import logo from "./icons/logo.png"
import axios from "axios";
import React from "react";
import { globalProjectDataContext } from "./globalProjectData"
import rightArray from "./icons/rightArray.svg"
import url from "../url"
import { Image, Row, Col, Divider, Slider, Button, Input, Select, Space, Progress, Typography, List, Popconfirm, message, Modal, notification } from 'antd';
const { Title } = Typography;


class ProjectLists extends React.Component {
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
                    <Col span={22} style={{ margin: "0px", padding: "0px" }} onClick={() => this.props.jumpToViewFinder(this.props.info.name)}>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={15}> <Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis" }} level={5}><div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{this.props.info.name}</div></Title> </Col>

                                    {this.props.info.running ? <Col span={5}><Typography style={{ margin: "0", textAlign: "left", color: "red" }} >正在拍摄</Typography></Col> : <Col span={5}></Col>}

                                    <Col span={2}></Col>
                                </Row>

                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}> <Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.date} - {this.props.info.diskUsage}</Typography> </Col>
                                 
                                    
                                </Row></Col>
                        </Row>
                    </Col>
                    <Col span={2}> <Button style={{ margin: "0px", padding: "0px" }} size="small" onClick={() => this.props.deleteProject(this.props.info.name)} type="link" danger >删除</Button></Col>
                </Row>
                <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
            </div>
        )
    }
}

class projects extends React.Component {

    constructor(props) {
        super(props)
        this.state = { addproject: false, newProjectName: "", projectsList: [], running: true, checkDeleteName: "", selectListName: "" }
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
    init =()=>{
        fetch(url+"/api/project")
            .then(res => res.json())
            .then(json => {
                if (json.status == "error") {
                    console.log(json)
                } else {
                    this.setState({
                        projectsList: json.data
                    })
                }
            }).catch((response) => {


            });

        fetch(url+"/api/project/running")
            .then(res => res.json())
            .then(json => {
                if (json.data == undefined) {
                    this.setState({
                        running: false
                    })
                } else {
                    this.setState({
                        running: true
                    })
                }


            }).catch((response) => {


            });
    }

    componentDidUpdate() {


    }

    openNotification = () => {

    };
    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToViewFinder = (name) => {

        this.context.setprojectname(name)

        window.location.href = window.location.origin + '/#/ViewFinder';

    }

    showModal = () => {
        this.setState({
            addproject: true,
        });
    };


    handledeleteProjectOK = () => {

        if (this.state.checkDeleteName == this.state.selectListName) {

            axios.delete(url+'/api/project/'+this.state.checkDeleteName)
                .then(res => {
                    this.init()
                }).catch(err => {
                    console.error(err);
                })

            this.setState({
                deleteobject: false,
                checkDeleteName: "",
            });


        } else {
            this.info('删除失败,待删除项目名称输入不正确')
            this.setState({
                deleteobject: false,
            });

        }



    };

    info = (msg) => {
        message.info(msg);
    };
    handleOk = e => {

        this.setState({
            addproject: false,
        });

        let projectdata = {
            name: this.state.newProjectName,
            info: "test-info",
            interval: 124800,
            video: {
                enable: true,
                fps: 30,
                maxImage: 450,
                previewVideoLength:15,
                shootingDays:6.5,
                totalVideoLength:2.5
            }


        }

        axios({
            method: 'POST', // 请求类型
            url: url+'/api/project', // 请求 url
            data: projectdata
        }).then(response => {

            this.context.setprojectname(response.data.data.name)
            if (this.state.running == false) {
                window.location.href = window.location.origin + '/#/ParamSetting/';
            } else {
                fetch(url+"/api/project")
                    .then(res => res.json())
                    .then(json => {

                        this.setState({
                            projectsList: json.data
                        })
                    }).catch((response) => {


                    });
            }

        }).catch((response) => {


            notification.open({
                message: '新建失败',
                description:
                    '同名项目已经存在。',
                onClick: () => {

                },
            });

        });
    };

    handleCancel = e => {

        this.setState({
            deleteobject: false,
            addproject: false,
            checkDeleteName: "",
        });

    };

    changeProjectName = (value) => {
        this.setState({
            newProjectName: value.target.value,
        });

    };

    deleteProjectByName = (value) => {
        this.setState({
            checkDeleteName: value.target.value,
        });
    };

    showDeleteProjectModal = (value) => {

        this.setState({
            selectListName: value,
            deleteobject: true,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title="删除项目"
                    open={this.state.deleteobject}
                    onOk={this.handledeleteProjectOK}
                    onCancel={this.handleCancel}
                >
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20} style={{ color: "red" }}>*注意此操作将永久删除{this.state.selectListName}项目以及项目下的所素材文件!</Col>
                        <Col span={2}></Col>
                        <Col span={2}></Col>
                        <Col span={20}>输入待删除项目名称</Col>
                        <Col span={2}></Col>
                        <Col span={2}></Col>
                        <Col span={20}><Input placeholder="项目名称" onChange={this.deleteProjectByName} value={this.state.checkDeleteName} /></Col>
                        <Col span={2}></Col>
                    </Row>
                </Modal>

                <Modal
                    title="新建项目"
                    open={this.state.addproject}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>输入项目名称</Col>
                        <Col span={2}></Col>
                        <Col span={2}></Col>
                        <Col span={20}><Input placeholder="项目名称" onChange={this.changeProjectName} /></Col>
                        <Col span={2}></Col>
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
                                    <Typography onClick={this.jumpToProjects} style={{ textAlign: "left", color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "16px" }}>项目拍摄</Typography>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


                <Row style={{ display: 'flex', marginTop: "12%", marginBottom: "0%" }} >
                    <Col span={19}> </Col>
                    <Col span={4}><Button style={{ color: "#00C2FF" }} size="small" onClick={this.showModal} >新建项目</Button></Col>
                    <Col span={1}> </Col>

                </Row>

                <Divider style={{ margin: "0", padding: "0" }} orientation="left">项目列表</Divider>


                <div style={{ margin: "0px", padding: "0px" }}>
                    {this.state.projectsList.map(projectsList =>
                        <div style={{ margin: "0px", padding: "0px" }} key={projectsList.name}>
                            <ProjectLists info={projectsList} jumpToViewFinder={this.jumpToViewFinder} deleteProject={this.showDeleteProjectModal}></ProjectLists>
                        </div>)}
                </div>

            </div>
        )
    }
}
projects.contextType = globalProjectDataContext
export default projects;