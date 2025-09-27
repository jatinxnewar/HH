import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import HelpHiveLogo from '../../components/HelpHiveLogo';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker', // seeker or helper
    phone: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone
    });
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ general: result.error || 'Failed to create account' });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <HelpHiveLogo size={60} />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Join HelpHive!</h2>
          <p className="text-muted-foreground">Create your account and start connecting</p>
        </div>

        {/* SignUp Form */}
        <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" />
                  <span className="text-destructive text-sm">{errors.general}</span>
                </div>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="Enter your phone number"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'seeker' }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'seeker' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon name="Search" size={24} className="mx-auto mb-2" />
                  <div className="text-sm font-medium">Find Help</div>
                  <div className="text-xs text-muted-foreground">Post tasks & hire helpers</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'helper' }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'helper' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon name="Heart" size={24} className="mx-auto mb-2" />
                  <div className="text-sm font-medium">Offer Help</div>
                  <div className="text-xs text-muted-foreground">Provide services & earn</div>
                </button>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Create a password"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              required
            />

            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  id="agree-terms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-dark">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-dark">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              iconName="User"
              iconPosition="left"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;