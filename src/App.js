import Parameters from "./components/parameters";
import { Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Parameters />} />
      </Routes>
    </div>
  );
}

export default App;
