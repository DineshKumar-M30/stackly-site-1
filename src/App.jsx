import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import AuthLayout from './components/AuthLayout';

const pages = {
  login: { component: <Login />, title: "Welcome Back" },
  signup: { component: <Signup />, title: "Create Account" },
  forgot: { component: <ForgotPassword />, title: "Reset Password" },
  otp: { component: <OTPVerification />, title: "Verify OTP" }
};

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [history, setHistory] = useState(['login']);

  const navigate = (pageKey) => {
    setHistory(prev => [...prev, pageKey]);
    setCurrentPage(pageKey);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  const currentPageData = pages[currentPage];

  return (
    <>
      {React.cloneElement(currentPageData.component, { 
        navigate, 
        goBack,
        currentPage 
      })}
      
      {/* Debug Navigation - Remove in Production */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-64 z-50 bg-black/80 backdrop-blur border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {Object.entries(pages).map(([key, { title }]) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className={`px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentPage === key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105 hover:text-white'
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
        {history.length > 1 && (
          <button
            onClick={goBack}
            className="mt-2 w-full bg-yellow-500/80 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-xl text-xs transition-all duration-200 hover:scale-105"
          >
            ← Back ({history.length - 1} steps)
          </button>
        )}
        <div className="mt-2 text-white/50 text-[10px] text-center">
          Demo OTP: 123456
        </div>
      </div>

      {/* Page Indicator */}
      <div className="fixed top-4 left-4 z-40 bg-black/50 backdrop-blur border border-white/20 text-white px-3 py-1 rounded-full text-xs font-mono">
        {currentPage.toUpperCase()} → {history.length} pages
      </div>
    </>
  );
}

export default App;
