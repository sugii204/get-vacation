import express, { Request, Response } from 'express';

const app = express();

// Middlwares
app.use(express.json());

app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

export default app;
