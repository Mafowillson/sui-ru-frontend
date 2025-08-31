import React, { useState, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import axiosInstance from '../..//axiosInstance';
import { AuthContext } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../common/PageLoader'; // Import the PageLoader component


const AuthPage = ({ onBack, setUser }) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true on submit
    try {
      const response = await axiosInstance.post('/api/auth/login/', { username, password });
      const accessToken = response.data.access || response.data.accessToken;
      const refreshToken = response.data.refresh || response.data.refreshToken;
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      setIsLoggedIn(true);
      if (setUser && response.data.user) {
        setUser(response.data.user);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: colors.bgSecondary }}
    >
      {loading && <PageLoader isLoading={true} />}
      <Card className="w-full max-w-md p-8 space-y-6 text-center">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} style={{ color: colors.text }} />
          </Button>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
            Welcome Back!
          </h2>
          <div></div> {/* Spacer to balance header */}
        </div>
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          Sign in to your account
        </p>
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
                color: '#000', // Force black text
                '::placeholder': { color: colors.textMuted }
              }}
            />
          </div>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
                color: '#000', // Force black text
                '::placeholder': { color: colors.textMuted }
              }}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            <LogIn size={20} className="mr-2" /> Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;

