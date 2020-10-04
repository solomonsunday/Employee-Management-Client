import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center" />
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center"> ReactJS With Web API Demo</h3>
          <h5 className="m-3 d-flex justify-content-center">Employee Management Portal</h5>
          <Navigation />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/department' component={Department} />
            <Route path='/employee' component={Employee} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
