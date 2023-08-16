import React from "react"; // Make sure to import React
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainForm from "./components/Mainform";
import Chatroom from "./components/Chatroom";
function App() {
  return (
    <div
      className="container-fluid color-red d-flex align-items-center justify-content-center"
      style={{ maxHeight: "100vh",minWidth:"20vw" }}
    >
      
      <Router>
        <Routes>
          <Route path="/" element={<h1><MainForm/></h1>}></Route>
          <Route path="/chat/:roomName" element={<Chatroom/>}></Route>
          <Route path="*" element={<h1>404 not found</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
