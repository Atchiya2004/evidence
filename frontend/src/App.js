import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCase from "./pages/CreateCase";
import CaseList from "./pages/CaseList";
import Phishing from "./pages/Phishing";
import UploadEvidence from "./pages/UploadEvidence";
import VerifyEvidence from "./pages/VerifyEvidence";
import Timeline from "./pages/Timeline";
import CaseDetails from "./pages/CaseDetails";
import Reports from "./pages/Reports";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/create-case" element={<Layout><CreateCase /></Layout>} />
        <Route path="/cases" element={<Layout><CaseList /></Layout>} />
        <Route path="/case/:id" element={<Layout><CaseDetails /></Layout>} />
        <Route path="/phishing" element={<Layout><Phishing /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>}/>
        <Route path="/upload" element={<Layout><UploadEvidence /></Layout>} />
        <Route path="/verify" element={<Layout><VerifyEvidence /></Layout>} />
        <Route path="/timeline/:id" element={<Layout><Timeline /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;