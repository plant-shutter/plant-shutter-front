import React, { Component } from "react";

import Home from "./components/home";
import ParamSetting from "./components/paramSetting";
import ViewFinder from "./components/viewFinder";
import Projects from "./components/projects";
import Album from "./components/album";
import AlbumType from "./components/albumType";
import VideoList from "./components/videoList";
import ImageList from "./components/imageList";
import Set from "./components/set";


import { Routes, Route, Link } from "react-router-dom";
import { globalProjectDataContext, globalProjectData, globalProjectDataChangeName } from "./components/globalProjectData"
const { Provider } = globalProjectDataContext

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      name:globalProjectData.name,
      ...globalProjectDataChangeName(this)
  }
  }

  render() {
    return (
      <div className="App">
        <Provider value={this.state} >
          <Routes>
            <Route path="/Projects" element={<Projects />} />
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/ViewFinder/" element={<ViewFinder />} />
            <Route path="/ParamSetting/" element={<ParamSetting />} />
            <Route path="/Album" element={<Album />} />
            <Route path="/AlbumType" element={<AlbumType />} />
            <Route path="/VideoList" element={<VideoList />} />
            <Route path="/ImageList" element={<ImageList />} />
            <Route path="/Set" element={<Set />} />
          </Routes>
        </Provider>


      </div>
    );
  }

}
