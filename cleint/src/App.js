import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Classes from "./components/Classes";
import {Routes, Route} from "react-router-dom";
import AdminHome from "./components/adminHome";
import ImageUpload from "./components/upl";



function App() {
  
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/upl" element={<ImageUpload />} />
      
    </Routes>
    
    </>
  );
}

export default App;
