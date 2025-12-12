import { useState, useRef, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, verifying, success, error
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && status === 'idle') {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, status]);

  // Auto-paste from clipboard
  useEffect(() => {
    const handlePaste = async (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
      if (paste.length === 6) {
        const newOtp = paste.split('').map(char => char || '');
        setOtp(newOtp);
        newOtp.forEach((_, i) => {
          if (inputRefs.current[i]) inputRefs.current[i].value = newOtp[i];
        });
        if (newOtp.every(d => d !== '')) handleVerify();
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const focusNext = (index) => {
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrev = (index) => {
    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value) {
      focusNext(index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusPrev(index);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusPrev(index);
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusNext(index);
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter complete 6-digit code');
      inputRefs.current[0]?.focus();
      return;
    }

    setStatus('verifying');
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (otpCode === '123456') { // Demo code
        setStatus('success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setStatus('idle');
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(50);
    setCanResend(false);
    setStatus('idle');
    inputRefs.current[0]?.focus();
  };

  return (
    <AuthLayout title="Verify OTP">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">📱</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Enter Verification Code</h2>
        <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
          We sent a 6-digit code to your email. Check your inbox (and spam folder).
        </p>
      </div>

      <div className={`otp-container ${error ? 'shake' : ''}`}>
        <div className="otp-inputs flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`otp-input w-14 h-14 text-2xl font-bold text-center bg-white/10 backdrop-blur border-2 border-white/20 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50 focus:border-indigo-400 transition-all duration-200 ${
                error && !digit ? 'border-red-400 ring-red-400/30' : digit ? 'border-green-400 bg-green-400/10' : ''
              }`}
              disabled={status === 'verifying' || status === 'success'}
            />
          ))}
        </div>

        {error && (
          <div className="error-toast mb-6 p-4 bg-red-500/20 backdrop-blur border border-red-400/50 rounded-xl flex items-center justify-center">
            <span className="mr-2">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="success-animation mb-6">
            <div className="flex flex-col items-center space-y-3 p-6 bg-green-500/20 backdrop-blur border border-green-400/50 rounded-2xl">
              <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center animate-bounce">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-green-100 font-medium">Verification successful!</p>
            </div>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={status === 'verifying' || status === 'success' || otp.join('').length !== 6}
          className={`w-full relative overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 group mb-6 ${
            status === 'verifying' || status === 'success' || otp.join('').length !== 6
              ? 'bg-white/20 backdrop-blur cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {status === 'verifying' ? (
            <>
              <div className="gradient-loader w-6 h-6"></div>
              <span>Verifying...</span>
            </>
          ) : status === 'success' ? (
            <>
              <span>✅ Verified!</span>
            </>
          ) : (
            <>
              <span>Verify OTP</span>
            </>
          )}
        </button>

        {/* Timer & Resend */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/70">
            <span>Resend code in</span>
            <span className="text-xl font-mono bg-white/20 px-3 py-1 rounded-lg min-w-[3rem] text-center">
              {timer.toString().padStart(2, '0')}s
            </span>
          </div>
          
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-indigo-300 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
              canResend 
                ? 'bg-indigo-500/20 backdrop-blur hover:bg-indigo-500/30 hover:scale-105 animate-pulse-once' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Resend Code
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a href="/login" className="text-indigo-300 hover:text-white text-sm font-medium transition-all duration-300">
          ← Back to Sign In
        </a>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;
