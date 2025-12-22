import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

export default function Home() {
  const [query, setQuery] = useState("");
  const [flats, setFlats] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/flats?location=${encodeURIComponent(query)}`);
      setFlats(res.data);
    } catch (err) {
      console.error("Error fetching flats:", err);
    }
  };

  const sampleFlats = [
    {
      id: 1,
      title: "Modern 2-Bedroom Flat",
      location: "Abuja",
      price: "₦250,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+1",
    },
    {
      id: 2,
      title: "Cozy Studio Apartment",
      location: "Lagos",
      price: "₦150,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+2",
    },
    {
      id: 3,
      title: "Shared Flat with Balcony",
      location: "Port Harcourt",
      price: "₦180,000 / month",
      image: "https://via.placeholder.com/400x250.png?text=Flat+3",
    },
  ];

  return (
    <div className="min-h-screen bg-hero-gradient dark:bg-brandGray flex flex-col items-center py-12">
      {/* Hero Section */}
      <Container maxWidth="md" className="text-center">
        <Typography variant="h2" className="font-extrabold text-brandBlue dark:text-white mb-6">
          Welcome to Flatshare Naija
        </Typography>
        <Typography variant="h6" className="text-gray-700 dark:text-gray-300 mb-10">
          Find affordable flats, connect with landlords, and chat instantly.
        </Typography>

        {/* Big Search Bar with Button Below */}
        <form onSubmit={handleSearch} className="flex flex-col items-center w-full mb-16">
          <TextField
            inputRef={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location (e.g., Abuja, Lagos)"
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: "800px",
              mb: 4,
              "& .MuiInputBase-root": {
                fontSize: "2rem",
                fontWeight: "bold",
                padding: "1.5rem",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "1rem 3rem",
              borderRadius: "0.75rem",
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#f59e0b" },
            }}
          >
            Search
          </Button>
        </form>
      </Container>

      {/* Listings Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {(flats.length > 0 ? flats : sampleFlats).map((flat) => (
            <Grid item xs={12} sm={6} md={4} key={flat.id}>
              <Card className="shadow-glass hover:shadow-lg transition">
                <CardMedia component="img" height="200" image={flat.image} alt={flat.title} />
                <CardContent>
                  <Typography variant="h5" className="font-bold text-brandBlue dark:text-white">
                    {flat.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                    {flat.location}
                  </Typography>
                  <Typography variant="subtitle1" className="text-brandPeach font-bold mt-2">
                    {flat.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
