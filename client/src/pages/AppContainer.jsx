import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../style/AppContainer.css';

import NavBar from './NavBar';
import Footer from '../components/Footer';
import Home from './Home';
import About from './About';
import Services from './Services';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Testimonials from './Testimonials';
import Terms from './Terms';
import Error from './Error';
import Preview from './Preview';
import Dashboard from '../pages/Dashboard';

// TODO: Add a reset Password page
// TODO: Add Dashboard page for a user who signed in
// TODO: Add Preview component - maybe YouTube API can be used to play a video here?
// TODO: Add conditional to an error page
// TODO: Add reset password componenet

const AppContainer = () => {
  return (
    <>
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/about' exact element={<About />} />
                <Route path='/services' exact element={<Services />} />
                <Route path='/sign-up' exact element={<SignUp />} />
                <Route path='/sign-in' exact element={<SignIn />} />
                <Route path='/preview' exact element={<Preview />} />
                <Route path='/testimonials' exact element={<Testimonials />} />
                <Route path='/terms' exact element={<Terms />} />
                <Route path='/error' exact element={<Error />} />
            </Routes>
            <Footer />
        </Router>
    </>
  )
}

export default AppContainer;
