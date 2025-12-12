import { useState, useRef } from 'react';
import AuthLayout from '../components/AuthLayout';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', image: null });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      const score = getPasswordStrength(value);
      setStrength(score);
      setProgress((score / 5) * 100);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password too short';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center p-3 border-2 border-dashed border-white/30 rounded-xl text-white/80 hover:border-white/50 transition-all"
          >
            {formData.image ? '✅ Image Selected' : '📷 Add Profile Image (Optional)'}
          </button>
        </div>

        <div>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? 'ring-red-400' : ''}`}
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? 'ring-red-400' : ''}`}
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.password ? 'ring-red-400' : ''}`}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-9 text-white/60">
            {showPassword ? '🙈' : '👁️'}
          </button>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          
          {/* Strength Meter */}
          <div className="mt-3">
            <div className="flex bg-white/10 rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all duration-300 rounded-full ${strength <= 2 ? 'bg-red-400' : strength <= 3 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{width: `${progress}%`}} />
            </div>
            <p className="text-xs text-white/60 mt-1 capitalize">{['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]}</p>
          </div>
        </div>

        <div>
          <input
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.confirmPassword ? 'ring-red-400' : ''}`}
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? <span>⏳ Creating...</span> : <span>Sign Up</span>}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
