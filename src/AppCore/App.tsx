import React from 'react';
import { PageLayout } from './app_style';
import AppContent from './AppContent/appContent';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './Store/store';

/**
 * This is the main app component
 * Where the store provider and the router wrap the app content
 * along with some styled divs that define the basic layout
 * @returns {Element}
 * @constructor
 */
const App = (): React.JSX.Element => {
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
