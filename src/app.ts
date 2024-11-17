import { Request, Response } from 'express';
import { Client } from 'pg';

const client: Client = require('./configs/DbConfig');
const express = require('express');
const app = express();

// Middlwares
app.use(express.json());

app.get('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.log('Error fetching users:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

module.exports = app;
