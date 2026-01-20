const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db')
// const certRoutes = require('./routes/certRoutes'); // For Module 7 later

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Body parser (To read JSON from frontend)
app.use(express.json());

// Link Auth Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));