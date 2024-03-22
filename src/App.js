import React from 'react';
import { Route, } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomwPage';
import ProfilePage from './Pages/ProfilePage';
import ExpensePage from './Pages/ExpensePage';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordpage';
import Layout from './components/Layout/Layout';
import ProfileFormPage from './Pages/UpdateProfile';

import { useSelector } from 'react-redux';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  return <Layout>
    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path='/auth'>
        <AuthPage />
      </Route>
      <Route path='/forgot'>
        <ForgotPasswordPage />
      </Route>
      <Route path='/profile'>
      {isLoggedIn ? <ProfilePage /> : <Redirect to='/login' />}
        
      </Route>
      <Route path='/update'>
      {isLoggedIn ? <ProfileFormPage /> : <Redirect to='/login' />}
        
      </Route>
      <Route path='/expense'>
      {isLoggedIn ? <ExpensePage /> : <Redirect to='/login' />}
        
      </Route>
      <Route path='/login'>
        {!isLoggedIn ? <LoginPage /> : <Redirect to='/profile' />}
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  </Layout>
};

export default App;
