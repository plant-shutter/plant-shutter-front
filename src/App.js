
import Video from "./components/hzy";
import Lifecircle from "./components/lifecircle";
import Propset from "./components/propset";
import Wheeltest from "./components/wheeltest";
import Stof from "./components/stof";
import Wait from "./components/wait";
import GetVideoList from "./components/getvideolist";
import { Routes, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';


function App() {
  console.log(111)
  console.log(111)
  console.log(222)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GetVideoList />} />
        <Route path="Wait" element={<Wait />} />
        <Route path="Getphoto" element={<Propset />} />
        <Route path="Lifecircle" element={<Lifecircle />} />
        <Route path="Wheeltest" element={<Wheeltest />} />
        <Route path="Stof" element={<Stof />} />
      </Routes>
    </div>
  );
}

export default App;
