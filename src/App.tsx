// src/App.tsx
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CommunityProvider } from './contexts/CommunityContext';
import environment from './lib/relay_environment';
import { supabase } from './lib/supabase';
import CommunityPicker from './views/community_picker/CommunityPicker.entrypoint';
import { Paths } from './views/paths';
import Portal from './views/portal/Portal.entrypoint';
import SignIn from './views/sign_up/SignIn';

const App = (): React.ReactElement => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsUserLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsUserLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <CommunityProvider>
          <Layout style={{ minHeight: '100vh' }}>
            <Routes>
              {isUserLoggedIn ? (
                <>
                  <Route path={Paths.Main} element={<CommunityPicker />} />
                  <Route
                    path={`${Paths.Portal}/:communityId/*`}
                    element={<Portal />}
                  />
                </>
              ) : (
                <Route path="*" element={<SignIn />} />
              )}
            </Routes>
          </Layout>
        </CommunityProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
};

export default App;
