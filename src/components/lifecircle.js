import React from "react";

class Lifecircle extends React.Component {
    constructor(props){
        super(props)
        this.state={count:0}
        console.log("cons")
    }
  
    onclick=() =>{
        this.setState({
            count:this.state.count+1
        })
    }

    componentDidMount() {
        console.log("did mount")
    }
    componentDidUpdate(){
        console.log("did updata")

    }
    
    render() {
        console.log("render")
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.onclick}>add</button>
            </div>
        )

    }
  }
  
  export default Lifecircle;