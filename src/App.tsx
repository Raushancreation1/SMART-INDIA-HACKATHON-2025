import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

// Theme and store
import theme from './theme';
import { store } from './store/store';

// Layout components
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FarmersPage from './pages/farmers/FarmersPage';
import BuyersPage from './pages/buyers/BuyersPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import FarmerDashboard from './pages/farmer/Dashboard';
import BuyerDashboard from './pages/buyer/Dashboard';
import ContractsPage from './pages/contracts/ContractsPage';
import CreateContractPage from './pages/contracts/CreateContractPage';
import ContractDetailsPage from './pages/contracts/ContractDetailsPage';
import ContractSuccessPage from './pages/contracts/ContractSuccessPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import FeedbackPage from './pages/FeedbackPage';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="feedback" element={<FeedbackPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="farmers" element={<FarmersPage />} />
                  <Route path="buyers" element={<BuyersPage />} />
<Route 
                    path="contracts" 
                    element={
                      <ProtectedRoute redirectTo="/auth/login">
                        <MainLayout>
                          <Routes>
                            <Route 
                              index 
                              element={
                                <Navigate 
                                  to={
                                    store.getState().auth.user?.role === 'farmer' 
                                      ? '/farmer/contracts' 
                                      : '/buyer/contracts'
                                  } 
                                  replace 
                                />
                              } 
                            />
                          </Routes>
                        </MainLayout>
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Auth routes */}
                <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                <Route path="/register" element={<Navigate to="/auth/register" replace />} />
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

                {/* Protected routes - Farmer */}
                <Route
                  path="/farmer"
                  element={
                    <ProtectedRoute allowedRoles={['farmer']}>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<FarmerDashboard />} />
                  <Route path="contracts" element={<ContractsPage userType="farmer" />} />
                  <Route path="contracts/new" element={<CreateContractPage />} />
                  <Route path="contracts/success" element={<ContractSuccessPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Protected routes - Buyer */}
                <Route
                  path="/buyer"
                  element={
                    <ProtectedRoute allowedRoles={['buyer']}>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<BuyerDashboard />} />
                  <Route path="contracts" element={<ContractsPage userType="buyer" />} />
                  <Route path="contracts/new" element={<CreateContractPage />} />
                  <Route path="contracts/success" element={<ContractSuccessPage />} />
                  <Route path="contracts/:id" element={<ContractDetailsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Redirect to home for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
