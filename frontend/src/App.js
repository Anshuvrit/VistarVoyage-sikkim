import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Monasteries from "./pages/Monasteries";
import MonasteryDetail from "./pages/MonasteryDetail";
import Festivals from "./pages/Festivals";
import FestivalDetail from "./pages/FestivalDetail";
import Community from "./pages/Community";
import Map from "./pages/Map";
import VirtualTours from "./pages/VirtualTours";
import Manuscripts from "./pages/Manuscripts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monasteries" element={<Monasteries />} />
            <Route path="/monasteries/:id" element={<MonasteryDetail />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/festivals/:id" element={<FestivalDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/map" element={<Map />} />
            <Route path="/virtual-tours" element={<VirtualTours />} />
            <Route path="/virtual-tours/:id" element={<VirtualTours />} />
            <Route path="/manuscripts" element={<Manuscripts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;