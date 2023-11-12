import React from 'react';
import { PageLayout } from './app_style';
import AppContent from './AppContent/appContent';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './Store/store';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <PageLayout>
          <AppContent />
        </PageLayout>
      </Router>
    </StoreProvider>
  );
};

export default App;
