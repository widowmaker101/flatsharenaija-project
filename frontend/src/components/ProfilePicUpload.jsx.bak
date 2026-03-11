import { useState } from "react"

export default function ProfilePicUpload() {
  const [file, setFile] = useState(null)

  const uploadPic = async () => {
    const token = localStorage.getItem("token")
    const formData = new FormData()
    if (file) formData.append("file", file)

    const res = await fetch("http://localhost:3001/users/profile-pic", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    })
    const data = await res.json()
    alert("Profile picture updated!")
    localStorage.setItem("profile_pic", data.profile_pic)
  }

  return (
    <div className="p-4">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadPic} className="ml-2 bg-indigo-600 text-white px-4 py-1 rounded">
        Upload
      </button>
    </div>
  )
}
