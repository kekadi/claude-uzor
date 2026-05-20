'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Heart, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const quickLogin = (e: string, p: string) => {
    setEmail(e)
    setPassword(p)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
            <Heart className="w-9 h-9 text-brand-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-white">Burleson Geriatric PC</h1>
          <p className="text-brand-200 mt-1 text-sm">Referral & Care Management Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header strip */}
          <div className="h-1.5 bg-gradient-to-r from-brand-500 via-blue-400 to-teal-400" />

          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign In to Your Account</h2>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    placeholder="you@burlesongp.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition shadow-sm text-sm"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Demo Credentials</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Admin', email: 'admin@burlesongp.com', pw: 'Admin2024!', color: 'text-purple-700 bg-purple-50' },
                  { label: 'Supervisor', email: 'supervisor@burlesongp.com', pw: 'Super2024!', color: 'text-blue-700 bg-blue-100' },
                  { label: 'Staff', email: 'staff@burlesongp.com', pw: 'Staff2024!', color: 'text-green-700 bg-green-50' }
                ].map(c => (
                  <button
                    key={c.email}
                    type="button"
                    onClick={() => quickLogin(c.email, c.pw)}
                    className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium hover:opacity-80 transition ${c.color}`}
                  >
                    <span className="font-semibold">{c.label}</span>
                    <span className="font-mono">{c.email}</span>
                    <span className="opacity-70">{c.pw}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-2 opacity-70">Click a row to auto-fill credentials</p>
            </div>
          </div>
        </div>

        {/* HIPAA notice */}
        <p className="text-center text-brand-300 text-xs mt-6">
          This system contains protected health information (PHI).<br />
          Access is restricted to authorized personnel only — HIPAA Applies.
        </p>
      </div>
    </div>
  )
}
