'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Response {
  id: string
  session_id: string
  response_type: string
  response_text?: string
  created_at: string
}

interface Analytics {
  total_visitors: number
  completed_stories: number
  responses_received: number
  latest_responses: Response[]
}

export default function AdminResponses() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthorized(true)
      fetchAnalytics()
    } else {
      setLoading(false)
    }
  }, [])

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple auth - in production use proper authentication
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      localStorage.setItem('admin_token', 'authorized')
      setIsAuthorized(true)
      fetchAnalytics()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/admin/analytics')
      const data = await res.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B18] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070B18] to-[#1a0f2e] flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAuth}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8 space-y-6"
        >
          <h1 className="text-3xl font-light text-white text-center">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 transition-colors"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-lg font-semibold text-white hover:shadow-lg transition-all"
          >
            Access Dashboard
          </button>
        </motion.form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070B18] to-[#1a0f2e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-light mb-2">Admin Dashboard</h1>
          <p className="text-white/60">Story responses and analytics</p>
        </motion.div>

        {/* Stats */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Total Visitors', value: analytics.total_visitors },
              { label: 'Completed Stories', value: analytics.completed_stories },
              { label: 'Responses Received', value: analytics.responses_received },
              { label: 'Completion Rate', value: `${analytics.total_visitors > 0 ? Math.round((analytics.completed_stories / analytics.total_visitors) * 100) : 0}%` },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
              >
                <div className="text-white/60 text-sm mb-2">{stat.label}</div>
                <div className="text-4xl font-light text-white">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Recent Responses Table */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-light">Recent Responses</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-white/60 text-sm font-medium">Date</th>
                    <th className="px-6 py-4 text-left text-white/60 text-sm font-medium">Response</th>
                    <th className="px-6 py-4 text-left text-white/60 text-sm font-medium">Session ID</th>
                    <th className="px-6 py-4 text-left text-white/60 text-sm font-medium">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.latest_responses.map((response, i) => (
                    <motion.tr
                      key={response.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white/80">
                        {new Date(response.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            response.response_type === 'yes'
                              ? 'bg-pink-500/20 text-pink-300'
                              : response.response_type === 'maybe'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {response.response_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60 font-mono text-xs">
                        {response.session_id.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-white/80">{response.response_text || '-'}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Logout button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            localStorage.removeItem('admin_token')
            setIsAuthorized(false)
          }}
          className="mt-8 px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </div>
  )
}
