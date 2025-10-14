import React, { Suspense } from 'react';
import AllRoutes from '../router/routes.js';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App" id='scrool'>
        <Suspense fallback={<LoadingSpinner fullScreen message="Loading Taleem Ul Quran..." />}>
          <AllRoutes/>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
