import './App.css'
import Navbar from './components/Navbar';
import CryptoScraperCTA from './CTA';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import FeaturesPage from './Features';
import DemoPage from './DemoPage';
import Dashboard from './Dashboard';
import ApiDocsPage from './ApiDocsPage';
import AboutPage from './AboutPage';
import Workflow from './WorkFlow';
import MainApp from "./Demo";
function App() {

  return (
    <>
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<CryptoScraperCTA />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/demo-page" element={<DemoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
