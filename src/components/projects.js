import logo from "./icons/logo.png"
import axios from "axios";
import React from "react";
import { globalProjectDataContext } from "./globalProjectData"
import rightArray from "./icons/rightArray.svg"
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
                    <Col span={22} style={{ margin: "0px", padding: "0px" }} onClick={() =>this.props.jumpToViewFinder(this.props.info.name)}>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={15}> <Title style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis" }} level={5}><div style={{ margin: "0", overflow: "hidden", textOverflow: "ellipsis",whiteSpace:"nowrap"  }}>{this.props.info.name}</div></Title> </Col>
                                    
                                    {this.props.running ? <Col span={5}><Typography style={{ margin: "0", textAlign: "left", color: "red" }} >正在拍摄</Typography></Col> : <Col span={5}></Col>}
                                
                                    <Col span={2}></Col>
                                </Row>

                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={12}> <Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.state.date}</Typography> </Col>
                                    <Col span={2}></Col>
                                    <Col span={9}><Typography style={{ margin: "0", textAlign: "left", color: "#9A9A9A" }} >{this.props.info.diskUsage}</Typography> </Col>
                                </Row></Col>
                        </Row>
                    </Col>
                    <Col span={2}> <Button style={{ margin: "0px", padding: "0px" }} size="small" onClick={this.showModal} type="link" danger >删除</Button></Col>
                </Row>
                <Divider style={{ margin: "0", padding: "0" }} orientation="left"></Divider>
            </div>
        )
    }
}

class projects extends React.Component {

    constructor(props) {
        super(props)
        this.state = { visible: false, newProjectName: "", projectsList: [] }
    }
    componentDidMount() {
        fetch("http://raspberrypi:9999/api/project")
            .then(res => res.json())
            .then(json => {

                this.setState({
                    projectsList: json.data
                })
            }).catch((response) => {

                console.log(response);
            });

    }
    componentDidUpdate() {


    }

    openNotification = () => {

    };
    jumpToHome() {

        window.location.href = window.location.origin + '/#/Home';

    }
    jumpToViewFinder=(name) =>{

        this.context.setprojectname(name)

        window.location.href = window.location.origin + '/#/ViewFinder';

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {

        this.setState({
            visible: false,
        });

        let projectdata = {
            name: this.state.newProjectName,
            info: "test-info",
            interval: 3000,
            video: {
                enable: true,
                fps: 2,
                maxImage: 10
            }

        }
  

        axios({
            method: 'POST', // 请求类型
            url: 'http://raspberrypi:9999/api/project', // 请求 url
            data: projectdata
        }).then(response => {

            this.context.setprojectname(response.data.data.name)
            window.location.href = window.location.origin + '/#/ParamSetting/';
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
            visible: false,
        });
    };

    changeProjectName = (value) => {
        this.setState({
            newProjectName: value.target.value,
        });
    };

    render() {

        return (
            <div>

                <Modal
                    title="新建项目"
                    open={this.state.visible}
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
                            <ProjectLists info={projectsList} jumpToViewFinder={this.jumpToViewFinder}></ProjectLists>
                        </div>)}
                </div>


            </div>
        )
    }
}
projects.contextType=globalProjectDataContext
export default projects;