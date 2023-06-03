import React,{createContext} from "react";
import { Button } from 'antd';

const {Provider,Consumer}=createContext()

function SonF(props){
    const {msg,getSonMSG,count}=props
    return(
        <div>函数子组件{msg} {count}
            <Button onClick={() =>getSonMSG("SonFmsg")}>add</Button>
        </div>
    )
}

function A(props){

    return(
        <div>A
            <Consumer>
                {value => <p>{value}</p>}
            </Consumer>
        </div>
    )
}


function B(props){

    return(
        <div>B

        </div>
    )
}

class SonC extends React.Component{
    render(){
        return(
            <div>类子组件{this.props.msg}
            
            <Button onClick={() =>this.props.getSonMSG("SonCmsg")}>add</Button>
            </div>
        )
    }
}


class Stof extends React.Component {
    state={
        msg:"msg",
        count:0
    }

    getSonMSG=(SonFmsg) => {
        this.setState({
            msg:SonFmsg
        })
        console.log(SonFmsg)
    }

    onclick=() =>{
        this.setState({
            count:this.state.count+1
        })
    }
    render(){
        return(
            <div>
                <Provider value={this.state.msg}>
                    <A/>
                    <B/>
                </Provider>
                <p>{this.state.msg}</p>
                    <Button onClick={this.onclick}>add</Button>
                    <SonF msg={this.state.msg} count={this.state.count} getSonMSG={this.getSonMSG}/>
                    <SonC msg={this.state.msg} getSonMSG={this.getSonMSG}/>

            </div>
        )
    }

}

export default Stof;