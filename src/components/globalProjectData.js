import React from "react";

export const globalProjectData = {
    name: ""
}
export const globalProjectDataContext = React.createContext(globalProjectData)

export const globalProjectDataChangeName = self => ({
    setprojectname(newName) {
        self.setState({
            name: newName
        }
        )
    }
})