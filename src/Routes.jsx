import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import HomePage from './pages/HomePage';
import HelperDiscoveryMap from './pages/helper-discovery-map';
import CommunityVerification from './pages/commity-verification';
import TaskPostingDashboard from './pages/task-posting-dashboard';
import HelperProfileDetails from './pages/helper-profile-details';
import TaskManagementHub from './pages/task-management-hub';
import EmergencySOSCenter from './pages/emergency-sos-center';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import HelperSearchPage from './pages/HelperSearchPage';
import HelperBookingPage from './pages/HelperBookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ChatPage from './pages/ChatPage';
import { AuthProvider } from './contexts/AuthContext';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Main App Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/helper-discovery-map" element={<HelperDiscoveryMap />} />
          <Route path="/commity-verification" element={<CommunityVerification />} />
          <Route path="/task-posting-dashboard" element={<TaskPostingDashboard />} />
          <Route path="/helper-profile-details" element={<HelperProfileDetails />} />
          <Route path="/task-management-hub" element={<TaskManagementHub />} />
          <Route path="/emergency-sos-center" element={<EmergencySOSCenter />} />
          
          {/* Helper & Booking Routes */}
          <Route path="/helper-search" element={<HelperSearchPage />} />
          <Route path="/helper/:helperId/book" element={<HelperBookingPage />} />
          <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
          <Route path="/chat/:helperId" element={<ChatPage />} />
          
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
