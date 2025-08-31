import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import DashboardPage from './dashboard';

// Use environment variables for Firebase config
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ClerklyLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w.org/2000/svg">
    <path d="M6 2L16 6L26 2V26L16 30L6 26V2Z" stroke="#252F3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 6V30" stroke="#252F3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function LandingPage({ onNavigate }) {
  return (
    <div className="min-vh-100 w-100 bg-light text-clerkly-dark d-flex flex-column">
      <header className="position-absolute top-0 start-0 w-100 p-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ClerklyLogo />
          <h1 className="font-serif fs-4 fw-semibold m-0">Clerkly</h1>
        </div>
        <button onClick={() => onNavigate('auth')} className="btn btn-light font-sans fw-medium">
          Log In
        </button>
      </header>
      
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <div className="text-center" style={{ maxWidth: '800px' }}>
          <h2 className="font-serif display-4 fw-bold">
            Where Legal Brilliance Meets
            <span className="text-clerkly-primary"> Intelligent Automation.</span>
          </h2>
          <p className="mt-4 fs-5 text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            Clerkly is the unified AI workspace for legal professionals. Automate research, drafting, and case management to focus on what truly matters: advocacy.
          </p>
          <button onClick={() => onNavigate('auth')} className="mt-5 btn btn-clerkly btn-clerkly-lg rounded-pill shadow-lg font-sans">
            Get Started
          </button>
        </div>
      </main>
      <footer className="w-100 text-center p-4 text-secondary">
        © 2025 Clerkly. All Rights Reserved.
      </footer>
    </div>
  );
}

function AuthPage({ onNavigate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const features = [
    { text: "AI-powered legal research", icon: "." },
    { text: "Automated document drafting", icon: "." },
    { text: "Intelligent case management", icon: "." },
  ];

  return (
    <div className="min-vh-100 bg-light d-flex flex-column p-3">
        <button onClick={() => onNavigate('landing')} className="btn btn-light position-absolute top-0 start-0 m-4 d-flex align-items-center gap-2 font-sans">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
            Back
        </button>
      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="row w-100 align-items-center bg-white rounded-4 shadow-xl overflow-hidden" style={{ maxWidth: '1000px' }}>
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5 bg-clerkly-primary-light h-100">
            <h2 className="font-serif text-clerkly-dark mb-4">Unlock Your Potential</h2>
            <ul className="list-unstyled">
                {features.map(feature => (
                    <li key={feature.text} className="d-flex align-items-center gap-3 mb-3 fs-5">
                        <span className="bg-white p-2 rounded-circle shadow-sm">{feature.icon}</span>
                        <span>{feature.text}</span>
                    </li>
                ))}
            </ul>
          </div>
          <div className="col-lg-6 p-5">
            <div className="w-100">
              <div className="d-flex align-items-center gap-3 mb-3 justify-content-center">
                  <ClerklyLogo />
                  <h1 className="font-serif h2 fw-semibold text-center text-clerkly-dark m-0">Clerkly</h1>
              </div>
              <h2 className="h5 text-center text-secondary mb-5">
                  {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              
              {error && <p className="alert alert-danger text-center">{error}</p>}
              
              <form onSubmit={handleAuthAction}>
                <div className="mb-3">
                  <label className="form-label fw-bold" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-control p-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Use a strong password"
                    className="form-control p-3"
                    required
                  />
                </div>
                <button type="submit" className="w-100 btn btn-clerkly fw-bold p-3 rounded-pill font-sans">
                  {isLogin ? 'Log In' : 'Register'}
                </button>
              </form>
              
              <p className="text-center text-secondary mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link text-clerkly-primary fw-bold text-decoration-none">
                  {isLogin ? 'Register' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-100 text-center p-4 text-secondary">
        © 2025 Clerkly. All Rights Reserved.
      </footer>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };
  
  if (loading) {
      return <div className="min-vh-100 d-flex align-items-center justify-content-center"><h5>Loading...</h5></div>;
  }
  
  if (user) {
      return <DashboardPage />;
  }

  switch (currentPage) {
    case 'auth':
      return <AuthPage onNavigate={handleNavigation} />;
    case 'landing':
    default:
      return <LandingPage onNavigate={handleNavigation} />;
  }
}

export default App;

