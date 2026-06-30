import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import loginImage from "../assets/login.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  if (user) return <Navigate to="/dashboard" replace />;

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", email || "Admin");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img src={loginImage} alt="Tailor login" />
      </div>
      <div className="login-form-side">
        <div className="login-card">
          <h1>Login</h1>
          <p className="subtitle">Sign in to your account to continue</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
