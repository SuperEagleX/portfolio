import express from 'express';
import { getDB } from '../models/db.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const db = getDB();
    db.prepare(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
    ).run(name.trim(), email.trim(), message.trim());

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

export default router;
