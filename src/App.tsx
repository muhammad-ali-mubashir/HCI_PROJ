import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/home" element={<Layout><LandingPage /></Layout>} />

          {/* Auth Pages - Isolated without Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected/App Routes */}
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/workspace" element={<Layout><WorkspacePage /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
