import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import ScrollToTop from '../utils/ScrollToTop';

import '../style/AppContainer.css';

import NavBar from './NavBar';
import Footer from '../components/Footer';
import Home from './Home';
import About from './About';
import Services from './Services';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Error from './Error';
import Preview from './Preview';
import Dashboard from '../pages/Dashboard';

const AppContainer = () => {
  return (
    <>
        <Router>
          <ScrollToTop />
          <NavBar />
          <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/dashboard' element={AuthService.loggedIn() ? <Dashboard /> : <Navigate to='/'/>} />
              <Route path='/about' exact element={<About />} />
              <Route path='/services' exact element={<Services />} />
              <Route path='/sign-up' exact element={AuthService.loggedIn() ? <Navigate to='/dashboard' /> : <SignUp />} />
              <Route path='/sign-in' exact element={AuthService.loggedIn() ? <Navigate to='/dashboard' /> : <SignIn />} />
              <Route path='/preview' exact element={<Preview />} />
              <Route path='/*' exact element={<Error />} />
          </Routes>
          <Footer />
        </Router>
    </>
  )
}

export default AppContainer;
