import TextLogo from '../components/atoms/TextLogo'
export default function Landing(){ return (<div className="min-h-screen bg-gradient-to-b from-sky-50 to-white"><header className="container-px py-6 flex items-center justify-between"><TextLogo /><div className="flex items-center gap-4"><a className="btn btn-ghost" href="/login">Login</a><a className="btn btn-primary" href="/register">Sign Up</a></div></header><section className="container-px hero mt-6 grid md:grid-cols-2 gap-6 items-center"><div><h1>Where Influencers & Brands Connect to Grow Together.</h1><p className="max-w-xl">Find collaborations, apply to campaigns, and manage projects — all in one place.</p><div className="mt-6 flex gap-4"><a className="btn btn-primary" href="/login">Get Started</a><a className="btn btn-ghost" href="/register">Create Account</a></div></div><div className="text-right"><img src="https://via.placeholder.com/360x260.png?text=Collab+Illustration" alt="illustration" className="mx-auto rounded-xl shadow" /></div></section></div>) }

<footer className="mt-auto border-t border-slate-200 bg-white py-6">
  <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
    © {new Date().getFullYear()} CollabSphere · Built with React + Tailwind
  </div>
</footer>