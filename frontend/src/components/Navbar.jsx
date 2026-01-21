export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">FlatshareNaija</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Listings</a></li>
          <li><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </div>
  )
}
