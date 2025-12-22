import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(urlMode !== 'signup');

  useEffect(() => {
    if (urlMode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [urlMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <div className="tabs tabs-boxed mb-6">
            <a className={`tab tab-lg ${isLogin ? 'tab-active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</a>
            <a className={`tab tab-lg ${!isLogin ? 'tab-active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</a>
          </div>
          <form>
            {!isLogin && (
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Full Name</span></label>
                <input type="text" placeholder="John Doe" className="input input-bordered" required />
              </div>
            )}
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" placeholder="you@example.com" className="input input-bordered" required />
            </div>
            <div className="form-control mb-6">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" placeholder="••••••••" className="input input-bordered" required />
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <a onClick={() => setIsLogin(!isLogin)} className="link link-primary ml-1 cursor-pointer font-semibold">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
