import React from "react";
import axios from "axios";
import { Row, Col,Progress,Space,Typography ,List ,Divider,Popconfirm, message, Button } from 'antd';

const { Title } = Typography;



const Det = (value) => {

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);


    const showPopconfirm = () => {
      setVisible(true);
    };

    const handleOk = () => {
      setConfirmLoading(true);

      axios({
        method: 'POST', // 请求类型
        url: 'http://192.168.1.100:1889/detVideo', // 请求 url
        
        data: {
            name:value.msg
        }
    }).then(response => {
        
        value.func(response.data)
        setVisible(false);
        setConfirmLoading(false);
    })

    };

    const handleCancel = () => {
        setVisible(false);
      };


    return (
      <>
        <Popconfirm
          title="确定要删除此视频吗？"
          visible={visible}
          onConfirm={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ loading: confirmLoading }}
          okText="确定"
          cancelText="取消"
        >
        <a onClick={showPopconfirm}>删除</a>
        </Popconfirm>
      </>
    );
  };


class GetVideoList extends React.Component {

    getvideolist(){
          axios({
            method: 'POST', // 请求类型
            url: 'http://192.168.1.100:1889/getVideoList', // 请求 url
            data: {

            }
        }).then(response => {
            console.log(response)
            response.data.disc.used_percent=response.data.disc.used_percent.toFixed(2)
            
            this.setState({
                disc:response.data.disc,
                videolist:response.data.videolist,
                looping:response.data.looping

            })
        })
        
    }

    constructor(props){
        super(props)
        this.state={disc:{free_size:59,total_size:59,used_percent:0},videolist:[] ,looping:2}
        this.getvideolist()
    }

    componentDidMount() {
        console.log("did mount")
    }

    componentDidUpdate(){
        console.log("did updata")
    }
    
    deletefile=(value) => {
        value.disc.used_percent=value.disc.used_percent.toFixed(2)
        this.setState({
            disc:value.disc,
            videolist:value.videolist

        })
    }


    takeVideo(){
        
        window.location.href = window.location.origin+'/#/Getphoto';

    }

    render() {
        console.log("render")
        if(this.state.looping==0){
            return(
                <div>
                    <div style={{backgroundColor:"#000000",padding:"5px"}}>
    
                        <Row justify="space-around" align="middle" >
                            <Col span={1}></Col>
                            <Col span={6} ><div  style={{color:"#ffffff",fontSize:"18px"}}>延时摄影</div></Col>
                            <Col span={11}></Col>
                            <Col span={4}><Button type="primary"  size="small" onClick={this.takeVideo} >开始拍摄</Button></Col>
                            <Col span={2}></Col>
                        </Row>
    
                    </div>
    
                    <Space  direction="vertical" size="small" style={{ display: 'flex' }}>
    
                        <Divider orientation="left">存储</Divider>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={7}><Progress type="circle" percent={this.state.disc.used_percent} width={80} /></Col>
                            <Col span={15}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                    <Row>
                                        <Col span={24}><Title level={5}>磁盘空间</Title></Col>
                                    </Row>
    
                                    <Row>
                                        <Col span={24}><Title level={5}>剩余{this.state.disc.free_size}GB，共{this.state.disc.total_size}GB</Title></Col>
                                    </Row>
                            </Space>
    
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Space>
    
                    <Divider orientation="left">视频</Divider>
                    <Row justify="space-around">
                        <Col span={2}></Col>
                            <Col span={20}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.videolist}
                                    renderItem={item => (
                                    <List.Item actions={[<Det msg={item.name} func={this.deletefile} ></Det>]}>
                                        <List.Item.Meta
                                        title={<a href={"http://192.168.1.100:23334/static/"+item.name}>{item.name}</a>}
                                        description={<div >{item.mem}</div>}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Col>
    
                        <Col span={2}></Col>
                    </Row>
                    
                </div>
            )
        }

        if(this.state.looping==1){
            return(
                <div>
                    <div style={{backgroundColor:"#000000",padding:"5px"}}>
    
                        <Row justify="space-around" align="middle" >
                            <Col span={1}></Col>
                            <Col span={6} ><div  style={{color:"#ffffff",fontSize:"18px"}}>延时摄影</div></Col>
                            <Col span={11}></Col>
                            <Col span={4}><Button danger type="primary"  size="small" onClick={this.takeVideo} >查看拍摄</Button></Col>
                            <Col span={2}></Col>
                        </Row>
    
                    </div>
    
                    <Space  direction="vertical" size="small" style={{ display: 'flex' }}>
    
                        <Divider orientation="left">存储</Divider>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={7}><Progress type="circle" percent={this.state.disc.used_percent} width={80} /></Col>
                            <Col span={15}>
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                    <Row>
                                        <Col span={24}><Title level={5}>磁盘空间</Title></Col>
                                    </Row>
    
                                    <Row>
                                        <Col span={24}><Title level={5}>剩余{this.state.disc.free_size}GB，共{this.state.disc.total_size}GB</Title></Col>
                                    </Row>
                            </Space>
    
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Space>
    
                    <Divider orientation="left">视频</Divider>
                    <Row justify="space-around">
                        <Col span={2}></Col>
                            <Col span={20}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.state.videolist.slice(1)}
                                    renderItem={item => (
                                    <List.Item actions={[<Det msg={item.name} func={this.deletefile} ></Det>]}>
                                        <List.Item.Meta
                                        title={<a href={"http://192.168.1.100:23333/static/"+item.name}>{item.name}</a>}
                                        description={<div >{item.mem}</div>}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Col>
    
                        <Col span={2}></Col>
                    </Row>
                    
                </div>
            )
        }
    }
  }
  
  export default GetVideoList;