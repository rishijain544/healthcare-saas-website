import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/dashboard/UserDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import BillingAutomationPage from './pages/features/BillingAutomationPage';
import RateComparisonPage from './pages/features/RateComparisonPage';
import GPSHospitalFinderPage from './pages/features/GPSHospitalFinderPage';
import AIAppointmentAgentPage from './pages/features/AIAppointmentAgentPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Feature Detail Pages */}
                  <Route path="/features/billing-automation" element={<BillingAutomationPage />} />
                  <Route path="/features/rate-comparison" element={<RateComparisonPage />} />
                  <Route path="/features/gps-hospital-finder" element={<GPSHospitalFinderPage />} />
                  <Route path="/features/ai-appointment-agent" element={<AIAppointmentAgentPage />} />
                  
                  {/* Protected Dashboard Routes */}
                  <Route path="/dashboard/user" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/doctor" element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
