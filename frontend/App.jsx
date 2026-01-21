<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/flats" element={<FlatSearch />} />
  <Route path="/flats/:id" element={<FlatDetails />} />
  <Route path="/flats/new" element={<FlatForm />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
<Router>
  <Navbar />
  <Shell>
    <Routes>
      {/* your routes */}
    </Routes>
  </Shell>
</Router>
