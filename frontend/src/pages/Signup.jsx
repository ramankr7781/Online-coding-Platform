import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="flex w-full max-w-5xl h-[650px] rounded-3xl overflow-hidden shadow-2xl glass-panel z-10 m-4 animate-fade-in-up">
        
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-12 bg-base-100/50 backdrop-blur-sm relative">
          <h2 className="text-3xl font-bold mb-2 text-center">Create an Account</h2>
          <p className="text-center text-base-content/60 mb-6">Join Coding ⭐ to start your journey.</p>

          {error && (
            <div className="alert alert-error mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{typeof error === 'string' ? error.replace(/Error:\s*/g, '') : "Something went wrong"}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors ${errors.firstName ? 'input-error' : ''}`} 
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors ${errors.emailId ? 'input-error' : ''}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-10 bg-base-200/50 focus:bg-base-100 transition-colors ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-8 pt-4"> 
              <button
                type="submit"
                className={`btn btn-primary w-full shadow-lg hover:shadow-primary/30 transition-all ${loading ? 'loading btn-disabled' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-base-content/70">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary font-semibold hover:text-primary-focus">
                Login
              </NavLink>
            </span>
          </div>
        </div>

        {/* Right Side - Hero/Decorative */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-secondary/80 to-accent/80 p-12 text-secondary-content relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="z-10 text-center">
            <h1 className="text-4xl font-bold mb-4 tracking-tight drop-shadow-lg">Join the Community</h1>
            <p className="text-lg opacity-90 drop-shadow-md">Track your progress, view solutions, and get AI-powered code reviews.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;