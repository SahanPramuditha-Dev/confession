'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Stats {
  total_visitors: number
  completed_stories: number
  completion_rate: number
}

interface Response {
  id?: string
  created_at: string
  final_response: string
  question?: string
  answer?: string
}

interface SessionData {
  id: string
  created_at: string
  device_info?: Record<string, any>
  completed: boolean
  final_response?: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [responses, setResponses] = useState<Response[]>([])
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'responses' | 'sessions'>('overview')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      fetchData()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/analytics')
      const data = await res.json()
      setStats(data.stats)
      setResponses(data.responses)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#070B18] to-[#1a0f2e] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
        >
          <h1 className="text-3xl font-light text-white mb-8 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FF4D6D]"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#FF4D6D] to-[#9D4EDD] rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070B18] to-[#1a0f2e] p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light text-white">Analytics Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          {['overview', 'responses', 'sessions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-light transition-all ${
                activeTab === tab
                  ? 'text-white border-b-2 border-[#FF4D6D]'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
              >
                <div className="text-white/60 text-sm mb-2">Total Visitors</div>
                <div className="text-4xl font-light text-white">{stats.total_visitors}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
              >
                <div className="text-white/60 text-sm mb-2">Completed Stories</div>
                <div className="text-4xl font-light text-white">{stats.completed_stories}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
              >
                <div className="text-white/60 text-sm mb-2">Completion Rate</div>
                <div className="text-4xl font-light text-white">{stats.completion_rate}%</div>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-light text-white mb-4">Summary</h3>
              <div className="space-y-3 text-white/70">
                <div className="flex justify-between">
                  <span>Incomplete Sessions:</span>
                  <span className="font-light">{stats.total_visitors - stats.completed_stories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yes Responses:</span>
                  <span className="font-light">{Math.round((stats.completed_stories * stats.completion_rate) / 100)}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Responses Tab */}
        {activeTab === 'responses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-light text-white mb-6">User Responses</h2>

            {loading ? (
              <div className="text-white/60 text-center py-8">Loading...</div>
            ) : responses.length === 0 ? (
              <div className="text-white/60 text-center py-8">No responses yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/60 font-normal">Date</th>
                      <th className="text-left py-3 px-4 text-white/60 font-normal">Response</th>
                      <th className="text-left py-3 px-4 text-white/60 font-normal">Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-white/80">
                          {new Date(response.created_at).toLocaleDateString()} {new Date(response.created_at).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4 text-white/80">{response.final_response}</td>
                        <td className="py-3 px-4 text-white/80 truncate">{response.answer || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-light text-white mb-6">Visitor Sessions</h2>

            {loading ? (
              <div className="text-white/60 text-center py-8">Loading...</div>
            ) : sessions.length === 0 ? (
              <div className="text-white/60 text-center py-8">No sessions yet</div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-semibold">{session.user_name || 'Anonymous'}</h3>
                        <p className="text-white/50 text-sm">{new Date(session.created_at).toLocaleString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.completed ? 'bg-green-500/20 text-green-200' : 'bg-yellow-500/20 text-yellow-200'
                      }`}>
                        {session.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-white/60">
                      <div>
                        <p className="text-white/40">Response</p>
                        <p className="text-white">{session.final_response || '-'}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Date Entered</p>
                        <p className="text-white">{session.date_entered || '-'}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Date Correct</p>
                        <p className="text-white">{session.date_correct !== null ? (session.date_correct ? 'Yes' : 'No') : '-'}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Stars Collected</p>
                        <p className="text-white">{session.stars_collected || 0}/7</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/40 text-sm">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Back to Story
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
