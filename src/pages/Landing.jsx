
import TextLogo from '../components/atoms/TextLogo';
import Scene from '../components/molecules/Scene';
import { FiUsers, FiTarget, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800">
      <header className="container-px py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <TextLogo />
        <div className="flex items-center gap-4">
          <a className="btn btn-ghost" href="/login">
            Login
          </a>
          <a className="btn btn-primary" href="/register">
            Sign Up
          </a>
        </div>
      </header>
      <section className="container-px hero flex flex-col items-center text-center py-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Where Influencers & Brands Connect to Grow Together.
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-lg text-gray-600">
            Find collaborations, apply to campaigns, and manage projects — all in one place.
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <a className="btn btn-primary btn-lg" href="/login">
            Get Started
          </a>
          <a className="btn btn-outline btn-lg" href="/register">
            Create Account
          </a>
        </div>
        <div className="w-full h-[400px] md:h-[500px] mt-8">
          <Scene />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-px text-center">
          <h2 className="text-4xl font-bold">Why CollabSphere?</h2>
          <p className="text-lg text-gray-600 mt-2">
            Everything you need to build successful partnerships.
          </p>
          <div className="grid md:grid-cols-4 gap-8 mt-12 text-left">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <FiUsers size={32} className="text-primary" />
              <h3 className="font-bold text-xl mt-4">Seamless Collaboration</h3>
              <p className="text-gray-600 mt-2">
                Connect directly with brands and influencers that match your niche.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <FiTarget size={32} className="text-primary" />
              <h3 className="font-bold text-xl mt-4">Discover Campaigns</h3>
              <p className="text-gray-600 mt-2">
                Browse and apply to exclusive campaigns from top brands.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <FiTrendingUp size={32} className="text-primary" />
              <h3 className="font-bold text-xl mt-4">Track Your Growth</h3>
              <p className="text-gray-600 mt-2">
                Use our dashboard to monitor your earnings and project success.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <FiDollarSign size={32} className="text-primary" />
              <h3 className="font-bold text-xl mt-4">Secure Payments</h3>
              <p className="text-gray-600 mt-2">
                Get paid on time, every time, with our integrated payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container-px py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} CollabSphere · All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}