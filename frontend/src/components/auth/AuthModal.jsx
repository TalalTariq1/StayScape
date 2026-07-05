import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialTab = 'signup' }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'signup' or 'login'
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Form field state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Fire registration request to backend via context
      await signup(fullName, email, password);
      
      // 2. Alert popup notifying the user their account is ready
      alert('Account created successfully! Please log in with your credentials to continue.');
      
      // 3. Wipe current form values
      resetForm();
      
      // 4. Force modal view over to the 'login' tab seamlessly
      setActiveTab('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setIsSubmitting(true);
    try {
      await login(email, password);
      resetForm();
      onClose();
      navigate('/dashboard'); // Take them directly to dashboard on live login
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header Blur Effect Area */}
        <div className="auth-modal-header-gradient"></div>
        
        {/* Close Button Cross */}
        <button className="auth-close-btn" onClick={onClose}>&times;</button>

        {/* Dynamic Titles */}
        {activeTab === 'signup' ? (
          <div className="auth-heading-block">
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-subtitle">Sign up to start booking your next trip.</p>
          </div>
        ) : (
          <div className="auth-heading-block">
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Log in to continue booking your next trip.</p>
          </div>
        )}

        {/* Nav Tabs Selector */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('signup')}
          >
            Sign up
          </button>
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleSwitchTab('login')}
          >
            Log in
          </button>
        </div>

        {/* Error message, shown for either form */}
        {error && <p className="auth-error-text">{error}</p>}

        {/* Conditional Tab Rendering */}
        {activeTab === 'signup' ? (
          /* --- SIGN UP FORM --- */
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Alex Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>

            {/* OR Text Separator */}
            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* Social Google OAuth Button */}
            <button type="button" className="google-oauth-btn">
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </button>

            {/* Footer Switch Prompt */}
            <div className="auth-footer-toggle">
              <p>Already have an account? <span onClick={() => handleSwitchTab('login')}>Log in</span></p>
            </div>
          </form>
        ) : (
          /* --- LOG IN FORM --- */
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label className="uppercase-label">EMAIL</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="label-row">
                <label className="uppercase-label">PASSWORD</label>
                <a href="/forgot" className="forgot-password-link">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>

            {/* OR Text Separator */}
            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* Social Google OAuth Button */}
            <button type="button" className="google-oauth-btn">
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continue with Google
            </button>

            {/* Footer Switch Prompt */}
            <div className="auth-footer-toggle">
              <p>Don't have an account? <span onClick={() => handleSwitchTab('signup')}>Sign up</span></p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthModal;