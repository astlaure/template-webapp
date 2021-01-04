import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import AuthContextProvider from './components/AuthContextProvider';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
