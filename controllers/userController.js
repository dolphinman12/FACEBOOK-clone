import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
export const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  