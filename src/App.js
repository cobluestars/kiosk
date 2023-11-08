import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import SelectTea from "./routes/SelectTea";
import Purchase from "./routes/purchase";
import Done from "./routes/done";
import Pos from "./routes/pos";

import "./reset.css";
import "./App.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selecttea" element={<SelectTea />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/done" element={<Done />} />
          <Route path="/pos" element={<Pos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
