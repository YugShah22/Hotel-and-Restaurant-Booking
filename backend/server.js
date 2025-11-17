const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory user store (for demo only)
const users = [];

// Sample hotel data
const hotels = [
  { name: 'Sea View Hotel', location: 'Juhu Beach', imageUrl: '' },
  { name: 'City Inn', location: 'Andheri West', imageUrl: '' },
];

// Sample restaurant data
const restaurants = [
  { name: 'Spice Garden', location: 'Bandra', imageUrl: '' },
  { name: 'Tandoori Nights', location: 'Powai', imageUrl: '' },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Mumbai Booking Hub API');
});

// Hotel route
app.get('/api/hotels', (req, res) => res.json(hotels));

// Restaurant route
app.get('/api/restaurants', (req, res) => res.json(restaurants));

// Register route
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ error: 'Email already registered' });

  users.push({ email, password });
  res.json({ message: 'Registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful', token: 'mock-token' }); // Replace with real JWT later
});

// ✅ Only one listen call
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.get('/api/users', (req, res) => {
  res.json(users); // ✅ returns all registered users
});