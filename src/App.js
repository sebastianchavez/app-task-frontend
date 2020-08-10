import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Switch, HashRouter  as Router } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards';

  //components
import Navbar from './components/Navbar'

// pages
import NotFound from './pages/404'
import Tasks from './pages/Tasks'
import Devs from './pages/Devs'
import Login from './pages/Login'

// guard
import { isLogin } from './guards/isLogin'


export default () => {

  return (  
    <Router>
    <GuardProvider guards={[isLogin]} error={NotFound}>
      <Navbar />
      <Switch>
          <GuardedRoute path="/" component={Tasks} exact meta={{ auth: true }} />
          <GuardedRoute path="/devs" component={Devs} exact meta={{ auth: true }}  />
          <GuardedRoute path="/login" component={() => <Login/>} exact />
          <GuardedRoute path="*" component={NotFound}  />
      </Switch> 
      <ToastContainer/>
    </GuardProvider>
    </Router>
  )
}