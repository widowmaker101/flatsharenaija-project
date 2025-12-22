import { useState, useEffect } from 'react'

export default function VotingSystem() {
  const [votes, setVotes] = useState(() => {
    return JSON.parse(localStorage.getItem("votes") || "[]")
  })
  const [topic, setTopic] = useState("")
  const [options, setOptions] = useState("")
  const [activeVote, setActiveVote] = useState(null)

  const createVote = () => {
    if (!topic || !options) return
    const newVote = {
      topic,
      options: options.split(",").map(o => o.trim()),
      results: {},
    }
    const updated = [...votes, newVote]
    setVotes(updated)
    localStorage.setItem("votes", JSON.stringify(updated))
    setTopic("")
    setOptions("")
  }

  const castVote = (voteIndex, option) => {
    const updated = [...votes]
    updated[voteIndex].results[option] = (updated[voteIndex].results[option] || 0) + 1
    setVotes(updated)
    localStorage.setItem("votes", JSON.stringify(updated))
    setActiveVote(voteIndex)
  }

  return (
    <div className="p-6 mt-6 border-t bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🗳 Flatmate Voting</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Topic (e.g. Cleaning schedule)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <input
          type="text"
          placeholder="Options (comma separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border"
        />
        <button
          onClick={createVote}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 hover:shadow-md transition-colors"
        >
          Create Vote
        </button>
      </div>

      {votes.length > 0 ? (
        <ul className="space-y-4">
          {votes.map((vote, i) => (
            <li key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-md p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{vote.topic}</h3>
              <div className="flex gap-2 flex-wrap">
                {vote.options.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => castVote(i, opt)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {activeVote === i && (
                <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  Results:
                  <ul>
                    {Object.entries(vote.results).map(([opt, count]) => (
                      <li key={opt}>{opt}: {count} votes</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No votes yet. Create one to get started.</p>
      )}
    </div>
  )
}
