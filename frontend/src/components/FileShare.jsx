import { useState } from 'react'

export default function FileShare({ chatId }) {
  const [files, setFiles] = useState(() => {
    return JSON.parse(localStorage.getItem(`files_${chatId}`) || "[]")
  })

  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      timestamp: new Date().toLocaleString()
    }))
    const updated = [...files, ...uploadedFiles]
    setFiles(updated)
    localStorage.setItem(`files_${chatId}`, JSON.stringify(updated))
  }

  return (
    <div className="mt-4 p-4 bg-white/30 dark:bg-gray-900/40 rounded-xl shadow">
      <h4 className="text-md font-bold text-gray-900 dark:text-white mb-2">📂 Shared Files</h4>
      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="mb-3"
      />
      {files.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {files.map((file, i) => (
            <li key={i} className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-md px-3 py-2">
              <span>{file.name} ({Math.round(file.size/1024)} KB)</span>
              <span className="text-gray-500">{file.timestamp}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files shared yet.</p>
      )}
    </div>
  )
}
