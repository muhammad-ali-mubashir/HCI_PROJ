import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { GlobalVisuals } from './components/GlobalVisuals';
import { AppLayout } from './components/AppLayout';

// Dictionary of routes for easier management if needed, but keeping simple for now
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/home" element={<Layout><LandingPage /></Layout>} />

      {/* Auth Pages - Isolated without Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected/App Routes */}
      <Route path="/projects" element={<AppLayout><ProjectsPage /></AppLayout>} />
      <Route path="/workspace" element={<AppLayout><WorkspacePage /></AppLayout>} />
      <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
      <Route path="/account-settings" element={<AppLayout><AccountSettingsPage /></AppLayout>} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <GlobalVisuals />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
