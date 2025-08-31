import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, User, Building } from 'lucide-react';

const RegisterPage = () => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Registration functionality would be implemented here');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ 
           background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
           backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
         }}>
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
               style={{ backgroundColor: colors.primary + '20' }}>
            <User className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Create Account</h1>
          <p style={{ color: colors.textSecondary }}>Join Sui-Ru MHSMS for advanced threat monitoring</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: colors.textMuted }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Organization
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: colors.textMuted }} />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="Your organization"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: colors.textMuted }} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? 
                  <EyeOff className="w-5 h-5" style={{ color: colors.textMuted }} /> :
                  <Eye className="w-5 h-5" style={{ color: colors.textMuted }} />
                }
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: colors.textMuted }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text,
                  focusRingColor: colors.primary
                }}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? 
                  <EyeOff className="w-5 h-5" style={{ color: colors.textMuted }} /> :
                  <Eye className="w-5 h-5" style={{ color: colors.textMuted }} />
                }
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" required />
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              I agree to the{' '}
              <a href="#" className="hover:underline" style={{ color: colors.primary }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="hover:underline" style={{ color: colors.primary }}>
                Privacy Policy
              </a>
            </span>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Create Account
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: colors.border }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2" style={{ backgroundColor: colors.bgCard, color: colors.textSecondary }}>
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="ghost" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="ghost" className="w-full">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            Already have an account?{' '}
            <a href="/login" className="hover:underline" style={{ color: colors.primary }}>
              Sign in
            </a>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;

