import './App.css'
import Navbar from './components/Navbar';
import CryptoScraperCTA from './CTA';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FeaturesPage from './Features';
import DemoPage from './DemoPage';
import Dashboard from './Dashboard';
import ApiDocsPage from './ApiDocsPage';
import AboutPage from './AboutPage';
import Workflow from './WorkFlow';
import Login from './Login';
import SignUp from './SignUp';
import SavedPage from './SavedPage';
import SearchResult from './components/SearchResults';
import MainApp from "./Demo";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  return (
    <>
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar user={user} setUser={setUser} setToken={setToken} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<CryptoScraperCTA />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/search" element={<SearchResult />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/demo-page" element={<DemoPage />} />
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />

        {/* Protected Dashboard */}
        <Route
  path="/dashboard"
  element={localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />}
/>

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/docs" element={<ApiDocsPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/workflow" element={<Workflow />} />
        </Routes>
      </main>

      <Footer />
    </div>
    {/* <MainApp/> */}
    </>
  )
}

export default App
