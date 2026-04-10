import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../lib/roles'
import TextLogo from '../../components/atoms/TextLogo'
import Footer from '../../components/organisms/Footer'
import api from '../../services/api'

export default function Register() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [niche, setNiche] = useState('Lifestyle')
  const [role, setRole] = useState(ROLES.INFLUENCER)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role,
      })
      if (response.status === 201) {
        login({
          name: name || (role === ROLES.BRAND ? 'Brand User' : 'Influencer User'),
          email: email || 'user@example.com',
          role,
          niche: role === ROLES.INFLUENCER ? niche : '',
          company: role === ROLES.BRAND ? 'Your Brand' : '',
        })
        nav('/loading')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.')
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="h-[var(--header-height)] border-b border-sky-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="container-px h-full flex items-center">
          <TextLogo />
        </div>
      </header>
      <div className="flex-1 grid place-items-center">
        <div className="card w-full max-w-lg p-8">
          <h1 className="text-2xl font-bold">Create account ✨</h1>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <form className="mt-6 space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="label">Name</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="label">Role</label>
              <select className="select" value={role} onChange={e => setRole(e.target.value)}>
                <option value={ROLES.INFLUENCER}>Influencer</option>
                <option value={ROLES.BRAND}>Brand</option>
              </select>
            </div>
            {role === 'influencer' && (
              <div>
                <label className="label">Niche</label>
                <input className="input" value={niche} onChange={e => setNiche(e.target.value)} />
              </div>
            )}
            <button className="btn btn-primary w-full">🚀 Sign up</button>
          </form>
          <div className="mt-5 text-base text-gray-600 dark:text-gray-300">
            Already have an account? <Link className="text-sky-700 dark:text-sky-300 underline" to="/login">Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
