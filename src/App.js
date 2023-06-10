import Parameters from "./components/parameters";
import Home from "./components/home";
import { Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ParameterSettings" element={<Parameters />} />
      </Routes>
    </div>
  );
}

export default App;
