import express from 'express';
import { getDB } from '../models/db.js';

const router = express.Router();

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields required' });

  const db = getDB();
  const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
  const result = stmt.run(name, email, message);
  res.json({ success: true, id: result.lastInsertRowid });
});

router.get('/projects', (_req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM projects ORDER BY featured DESC, created_at DESC').all();
  res.json(rows);
});

router.get('/skills', (_req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM skills ORDER BY category, level DESC').all();
  res.json(rows);
});

export default router;
