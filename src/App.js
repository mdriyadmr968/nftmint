import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Homepage/Home";
import Mintnft from "./Component/Mintnft/Mintnft";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mintnft" element={<Mintnft />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
