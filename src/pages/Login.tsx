import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/layout/Logo';
import { Field } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import './Login.css';

const VALID_USERNAME = 'stepsys';
const VALID_PASSWORD = '5$7&SWsScHJg';

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';
    return <Navigate to={from} replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Enter a username and password to continue.');
      return;
    }
    if (username.trim() !== VALID_USERNAME || password !== VALID_PASSWORD) {
      setError('Invalid username or password.');
      return;
    }
    setError(null);
    login(username.trim());
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';
    navigate(from, { replace: true });
  }

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-card__brand">
          <span className="login-card__logo">
            <Logo size={28} />
          </span>
          <span className="login-card__product">AI Studio</span>
        </div>

        <div className="login-card__heading">
          <h1 className="page-title" style={{ fontSize: 20 }}>
            Sign in
          </h1>
          <p className="muted" style={{ margin: '4px 0 0' }}>
            Enter your credentials to access the agent platform.
          </p>
        </div>

        <Field label="Username">
          <input
            className="field__control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. core-dev"
            autoComplete="username"
            autoFocus
          />
        </Field>

        <Field label="Password">
          <input
            type="password"
            className="field__control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </Field>

        {error && <p className="login-card__error">{error}</p>}

        <Button type="submit" variant="primary" className="login-card__submit">
          Log in
        </Button>
      </form>
    </div>
  );
}
