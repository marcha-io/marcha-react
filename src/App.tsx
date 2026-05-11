// src/App.tsx
import { Layout } from 'antd';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';
import environment from './utils/relay_environment';
import CommunityPicker from './views/community_picker/CommunityPicker.entrypoint';
import { Paths } from './views/paths';
import Portal from './views/portal/Portal.entrypoint';
import ForgotPassword from './views/sign_up/ForgotPassword';
import ResetPassword from './views/sign_up/ResetPassword';
import SignIn from './views/sign_up/SignIn';
import SignUp from './views/sign_up/SignUp';

const AppRoutes = (): React.ReactElement => {
  const { isUserLoggedIn } = useAuth();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        {isUserLoggedIn ? (
          <>
            <Route path={Paths.Main} element={<CommunityPicker />} />
            <Route
              path={`${Paths.Portal}/:communityId/*`}
              element={<Portal />}
            />
            <Route
              path={Paths.SignIn}
              element={<Navigate to={Paths.Main} replace />}
            />
            <Route
              path={Paths.ResetPassword}
              element={<ResetPassword />}
            />
            <Route path="*" element={<Navigate to={Paths.Main} replace />} />
          </>
        ) : (
          <>
            <Route path={Paths.SignIn} element={<SignIn />} />
            <Route path={Paths.SignUp} element={<SignUp />} />
            <Route path={Paths.ForgotPassword} element={<ForgotPassword />} />
            <Route path={Paths.ResetPassword} element={<ResetPassword />} />
            <Route path="*" element={<Navigate to={Paths.SignIn} replace />} />
          </>
        )}
      </Routes>
    </Layout>
  );
};

const App = (): React.ReactElement => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <AuthProvider>
          <CommunityProvider>
            <AppRoutes />
          </CommunityProvider>
        </AuthProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
};

export default App;
