import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Team from './pages/Team';
import TeamMemberDetail from './pages/TeamMember';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PracticalInfo from './pages/PracticalInfo';
import Legal from './pages/Legal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/CMSDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './components/ToastProvider';
import ScrollToTop from './components/ScrollToTop';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  console.log("Rendering App component");
  return (
    <DataProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <Layout>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Navigate to="/services/medecine-generale" replace />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:memberId" element={<TeamMemberDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/horaires" element={<PracticalInfo />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;