import React from "react";

import { Popconfirm, message, Button } from 'antd';
const text = '确定要删除此视频吗？';

const Det = (value) => {

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);


    const showPopconfirm = () => {
      setVisible(true);
    };

    const handleOk = () => {
        console.log(value.msg)
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        value.func(value.msg)
      }, 3000);
    };

    return (
      <>
        <Popconfirm
          title="Title"
          visible={visible}
          onConfirm={handleOk}
          okButtonProps={{ loading: confirmLoading }}
        >
        <a onClick={showPopconfirm}>删除</a>
        </Popconfirm>
      </>
    );
  };


  
class Wheeltest extends React.Component {

    


    constructor(props){
        super(props)
        this.state={
            "count":1,
            "disc": {
                "free_size": 3.64,
                "total_size": 14.32,
                "used_percent": 74.56
            },
            "videolist": [
                {
                    "ctime": 1643921702.44,
                    "mem": "2.51GB",
                    "name": "大菩萨岭(蓝光中文字幕).The.Sword.of.Doom.1966.CC.BD-1080p.X264.AAC.CHS-UUMp4.avi"
                },
                {
                    "ctime": 1643920456.38,
                    "mem": "539.1MB",
                    "name": "GH010578.avi"
                },
                {
                    "ctime": 1643877155.58,
                    "mem": "3.47MB",
                    "name": "video1643876699762.avi"
                },
                {
                    "ctime": 1643876559.2,
                    "mem": "0.35MB",
                    "name": "video1643876475686.avi"
                },
                {
                    "ctime": 1643876431.04,
                    "mem": "0.1MB",
                    "name": "video1643876400720.avi"
                },
                {
                    "ctime": 1643876319.26,
                    "mem": "0.03MB",
                    "name": "video1643876263398.avi"
                },
                {
                    "ctime": 1643874984.65,
                    "mem": "0.57MB",
                    "name": "video1643874872443.avi"
                },
                {
                    "ctime": 1643874849.78,
                    "mem": "0.09MB",
                    "name": "video1643874828265.avi"
                },
                {
                    "ctime": 1643872202,
                    "mem": "60.53MB",
                    "name": "video1643865458236.avi"
                }
            ]
        }
    }
  
    deletefile=(value) => {
        this.setState({
            count:value
        })
        console.log(value)
        console.log(this.state)
    }

    
    render() {

        return(
            <div>
                <p>{this.state.count}</p>
                <Det msg={this.state.videolist[1].name} func={this.deletefile}></Det>

            </div>
        )

    }
  }
  
  export default Wheeltest;