import React, { useState } from 'react';
import { Github, Mail, Lock, User, AlertCircle, Chrome } from 'lucide-react';
import './Signup.scss';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__header">
          <h1>Create an Account</h1>
          <p>Join our community today</p>
        </div>

        <div className="signup__social">
          <button className="signup__social-btn signup__social-btn--github">
            <Github size={20} />
            Continue with GitHub
          </button>
          <button className="signup__social-btn signup__social-btn--google">
            <Chrome size={20} />
            Continue with Google
          </button>
        </div>

        <div className="signup__divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="signup__form">
          <div className="signup__form-group">
            <div className="signup__input-wrapper">
              <User size={20} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && (
              <div className="signup__error">
                <AlertCircle size={16} />
                {errors.username}
              </div>
            )}
          </div>

          <div className="signup__form-group">
            <div className="signup__input-wrapper">
              <Mail size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <div className="signup__error">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>

          <div className="signup__form-group">
            <div className="signup__input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <div className="signup__error">
                <AlertCircle size={16} />
                {errors.password}
              </div>
            )}
          </div>

          <div className="signup__form-group">
            <div className="signup__input-wrapper">
              <Lock size={20} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && (
              <div className="signup__error">
                <AlertCircle size={16} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className="signup__submit">
            Create Account
          </button>
        </form>

        <div className="signup__footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;