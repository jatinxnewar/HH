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

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/helper-discovery-map" element={<HelperDiscoveryMap />} />
        <Route path="/commity-verification" element={<CommunityVerification />} />
        <Route path="/task-posting-dashboard" element={<TaskPostingDashboard />} />
        <Route path="/helper-profile-details" element={<HelperProfileDetails />} />
        <Route path="/task-management-hub" element={<TaskManagementHub />} />
        <Route path="/emergency-sos-center" element={<EmergencySOSCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
