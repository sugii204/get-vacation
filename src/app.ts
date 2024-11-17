import { Request, Response } from 'express';

const express = require('express');
const app = express();

// Middlwares
app.use(express.json());

app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

module.exports = app;
