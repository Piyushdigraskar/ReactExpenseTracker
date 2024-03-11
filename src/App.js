import React from 'react';
import { Route , } from 'react-router-dom';
import { Switch,Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomwPage';
import Layout from './components/Layout/Layout';

const App = () => {
  return <Layout>
    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/auth'>
        <AuthPage />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  </Layout>
};

export default App;
