import express from 'express';
import cors from 'cors';
import './database.js';  
import dotenv from 'dotenv';
dotenv.config();     // ✅ connect to MongoDB

import Authroute from './Router/Authroute.js'
import PasteRoute from './Router/PasteRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.use('/api/auth',Authroute)
app.use('/api/paste',PasteRoute );




app.listen(process.env.PORT, () => console.log(`🚀 Backend running on http://localhost:${process.env.PORT}`));
