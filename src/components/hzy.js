import React from "react";
import axios from "axios";



const imgStyle = {
  width: "100%",
  height: "100%",

};

class Video extends React.Component {
    state = {
      text: "Hello React"
    };
  
    state={data:"",sign:""}
    changeP(){
      this.setState({
        sign:"123"
      })
    }




    getphoto(){
      this.changeP()
        axios({
          method: 'POST', // 请求类型
          url: 'http://raspberrypi:1889/a', // 请求 url
          data: {
              title: "11111111",
          }
      }).then(response => {
          console.log(response.data.data);
          this.setState({
            data:"data:image/png;base64,"+response.data.data
          })
          // console.log(this.state.data);

      })
    }

    componentDidMount() {

    }
    

    render() {
      return (
        <div>

            <img style={imgStyle} src={this.state.data} ></img>
      
            {/* <p>{this.state.sign}</p> */}
            <button onClick={()=>this.getphoto()}>拍照</button>
        </div>
      )
    }
  }
  
  export default Video;