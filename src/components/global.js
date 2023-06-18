import React from "react";

export const globalData={
    a:1
}
export const globalContext=React.createContext(globalData)

export const globalActions =self =>({
    add(){
        self.setState(state =>({
            a:state.a+1
        }))
    }
})