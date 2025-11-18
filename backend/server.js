const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/image", express.static("public/image")); // Serve images from public/image

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mumbaiBookingHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Hotel model
const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  imageUrl: String,
});
const Hotel = mongoose.model("Hotel", hotelSchema);

// Restaurant model
const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  imageUrl: String,
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Mumbai Booking Hub API");
});

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Email already registered" });

    await User.create({ email, password });

    res.json({
      message: "Registered successfully",
      user: { email },
      token: "mock-token",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing email or password" });

  try {
    const user = await User.findOne({ email, password });
    if (!user)
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { email },
      token: "mock-token",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get all hotels
app.get("/api/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Add a new hotel
app.post("/api/hotels", async (req, res) => {
  const { name, location, imageUrl } = req.body;
  if (!name || !location || !imageUrl)
    return res.status(400).json({ error: "Missing hotel data" });

  try {
    const hotel = await Hotel.create({ name, location, imageUrl });
    res.status(201).json(hotel);
  } catch (err) {
    console.error("Add hotel error:", err);
    res.status(500).json({ error: "Failed to add hotel" });
  }
});

// Add a new restaurant
app.post("/api/restaurants", async (req, res) => {
  const { name, location, imageUrl } = req.body;
  if (!name || !location || !imageUrl)
    return res.status(400).json({ error: "Missing restaurant data" });

  try {
    const restaurant = await Restaurant.create({ name, location, imageUrl });
    res.status(201).json(restaurant);
  } catch (err) {
    console.error("Add restaurant error:", err);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});