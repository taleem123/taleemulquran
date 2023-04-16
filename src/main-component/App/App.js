import React from 'react';
import AllRoutes from '../router/routes.js'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const App = () => { 

  return (
    <div className="App" id='scrool'>
          <AllRoutes/>
          <ToastContainer/>
    </div>
  );
}

export default App;
