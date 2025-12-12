import { useState, useRef } from 'react';
import AuthLayout from '../components/AuthLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const emailRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      emailRef.current?.focus();
      return;
    }

    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setSuccessMsg('Password reset link sent! Check your email.');
    }, 2000);
  };

  return (
    <AuthLayout title="Reset Password">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">🔒</span>
        </div>
        <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="input-group">
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className={`w-full p-4 bg-white/10 backdrop-blur border-2 border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ${
              error ? 'border-red-400 ring-2 ring-red-400/30 shake' : ''
            }`}
            disabled={status === 'sending' || status === 'success'}
          />
          {error && (
            <span className="error-text block mt-2 flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </span>
          )}
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="success-animation">
            <div className="flex flex-col items-center space-y-3 p-6 bg-green-500/20 backdrop-blur border border-green-400/50 rounded-2xl">
              <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center animate-bounce">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-green-100 font-medium">{successMsg}</p>
              <p className="text-green-100/80 text-sm">Didn't receive the email? Check your spam folder.</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!validateEmail(email) || status === 'sending' || status === 'success'}
          className={`w-full relative overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 group ${
            !validateEmail(email) || status === 'sending' || status === 'success'
              ? 'bg-white/20 backdrop-blur cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {status === 'sending' ? (
            <>
              <div className="gradient-loader w-6 h-6"></div>
              <span>Sending...</span>
            </>
          ) : status === 'success' ? (
            <>
              <span>✅ Sent!</span>
            </>
          ) : (
            <>
              <span>Send Reset Link</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <a
          href="/login"
          className="inline-flex items-center space-x-2 text-indigo-300 hover:text-white text-sm font-medium transition-all duration-300 group"
        >
          <span>←</span>
          <span>Back to Sign In</span>
        </a>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
