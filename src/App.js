import Parameters from "./components/parameters";
import Home from "./components/home";
import ParamSetting from "./components/paramSetting";
import Projects from "./components/projects";
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ParamSetting/:name" element={<ParamSetting />} />
        <Route path="/ParameterSettings" element={<Parameters />} />
      </Routes>
    </div>
  );
}

export default App;
