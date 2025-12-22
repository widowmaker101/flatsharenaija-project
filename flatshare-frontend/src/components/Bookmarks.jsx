const [bookmarks, setBookmarks] = useState([])

useEffect(() => {
  const token = localStorage.getItem("token")
  fetch("http://localhost:3001/users/me/bookmarks", {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setBookmarks(data))
}, [])

<div>
  <h4 className="font-bold">🔖 Bookmarked Messages</h4>
  {bookmarks.map(b => (
    <div key={b.id} className="text-sm text-gray-700 border-b py-1">
      {b.text}
    </div>
  ))}
</div>
