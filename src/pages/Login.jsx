// pages/Login.jsx
import { useState, useRef, useEffect } from 'react';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [shake, setShake] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pwd) => pwd.length >= 6;

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          setSuccess('');
          // Navigate to dashboard
          window.location.href = '/dashboard';
        }, 2000);
      }, 2000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className={`form-container ${shake ? 'shake' : ''}`}>
        <div className="input-group">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`auth-input ${errors.email ? 'error' : ''}`}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group relative">
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`auth-input pr-12 ${errors.password ? 'error' : ''}`}
            required
          />
          <button type="button" onClick={togglePassword} className="password-toggle">
            {showPassword ? '🙈' : '👁️'}
          </button>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              className="w-5 h-5 accent-indigo-400 rounded"
            />
            <span className="text-white/80 text-sm">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-indigo-300 hover:text-white text-sm font-medium transition-all duration-300">Forgot Password?</a>
        </div>

        {success && (
          <div className="success-toast zoom-in">
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>{success}</span>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className={`submit-btn w-full ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <span>
              <span className="gradient-loader"></span>
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn google" onClick={() => window.location.href = '/api/auth/google'}>
            <span>🌐</span>
            Google
          </button>
          <button className="social-btn github" onClick={() => window.location.href = '/api/auth/github'}>
            <span>⚡</span>
            GitHub
          </button>
        </div>

        <p className="text-center mt-6">
          Don't have an account? <a href="/signup" className="text-indigo-300 hover:text-white font-semibold">Sign up</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
