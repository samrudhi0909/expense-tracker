const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'https://expense-tracker-frontend-ashen-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());
// Preflight request handler for /api/auth/signin
app.options('/api/auth/signin', cors());

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
