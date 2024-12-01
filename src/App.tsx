import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { About } from "./pages/About";
import Translate from "./pages/Translate";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Translate />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
