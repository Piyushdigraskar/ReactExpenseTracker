import React, {useContext} from 'react';
import { Route, } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomwPage';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordpage';
import Layout from './components/Layout/Layout';
import ProfileFormPage from './Pages/UpdateProfile';
import AuthContext from './Store/AuthContext';

const App = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;
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
