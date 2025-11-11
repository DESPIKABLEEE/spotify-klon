const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 6970;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'gabo';
const DB_PASSWORD = process.env.DB_PASSWORD || 'milkakeks';
const DB_NAME = process.env.DB_NAME || 'spotify_clone';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'kljuc';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );
    const user = { id: result.insertId, email };
    const token = createToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const sanitizedUser = { id: user.id, email: user.email };
    const token = createToken(sanitizedUser);
    res.json({ user: sanitizedUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
