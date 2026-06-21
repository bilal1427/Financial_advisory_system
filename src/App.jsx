import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AnalysisForm from './pages/AnalysisForm';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';
import History from './pages/History';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<AnalysisForm />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
