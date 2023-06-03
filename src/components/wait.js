import React from "react";
import { Progress,Row, Col,Space,Typography } from 'antd';
const { Title } = Typography;
class Lifecircle extends React.Component {
    constructor(props){
        super(props)
        this.state={count:0 }
        console.log("cons")
    }
  
    onclick=() =>{
        this.setState({
            count:this.state.count+1
        })
    }

    componentDidMount() {
        this.timer = setInterval(function () {
            var count = this.state.count;
            count=count+1;

            if (count >= 100) {
                window.location.href = '/';

            }
            this.setState({
                count: count
            });
          }.bind(this), 1000);
    }

    
    render() {
        this.H=document.documentElement.clientHeight
        return(
            <div >
                    <Row style={{height:this.H ,backgroundColor:"#ffffff"}} justify="space-around" align="middle">
                    <Space direction="vertical" size="large" align="center">
                        <Col>

                            <Row>
                                <Col align="center"  span={24}  >
                                    <Progress type="circle" percent={this.state.count} />
                                </Col>
                            </Row>

                            <Row>
                                <Col align="center" span={24}>
                                <Title level={5}>视频制作中，需耐心等待2分钟</Title>
                                </Col>
                            </Row>

                        </Col>
                        </Space>

                    </Row>
                
            </div>
        )

    }
  }
  
  export default Lifecircle;