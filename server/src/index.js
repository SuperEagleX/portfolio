import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './models/db.js';
import portfolioRoutes from './routes/portfolio.js';
import contactRoute from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoute);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

initDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
