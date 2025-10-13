import React, { Suspense } from 'react';
import AllRoutes from '../router/routes.js';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import '../../css/rtl-support.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App" id='scrool' dir="rtl">
        <Suspense fallback={<LoadingSpinner fullScreen message="تعلیم القرآن لوڈ ہو رہا ہے..." />}>
          <AllRoutes/>
        </Suspense>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
