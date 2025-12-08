import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import SearchScores from "./pages/SearchScores";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<SearchScores />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
