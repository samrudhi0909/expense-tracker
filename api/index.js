// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
app.use(cors({
  origin: 'https://expense-tracker-frontend-ashen-seven.vercel.app', // Update with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Allow preflight requests for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://expense-tracker-frontend-ashen-seven.vercel.app');
  console.log('Headers:', res.getHeaders());
  next();
});


dotenv.config();

connectDB();

const app = express();

app.use(express.json());


// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
