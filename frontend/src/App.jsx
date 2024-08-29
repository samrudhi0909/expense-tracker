import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      {/* <div className="app-container">
        <img src={logo} alt="App Logo" className="app-logo" /> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
                <Home /> 
            }
          />
        </Routes>
      {/* </div> */}
    </Router>
  );
}
export default App;