import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import assignmentRoutes from './routes/assignmentRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;
const MAX_PORT_RETRIES = Number(process.env.PORT_RETRY_LIMIT) || 15;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/', lessonRoutes);
app.use('/', assignmentRoutes);

const listenWithPortFallback = (preferredPort, retriesLeft = MAX_PORT_RETRIES) =>
  new Promise((resolve, reject) => {
    const tryListen = (port, remainingRetries) => {
      const server = app.listen(port, () => {
        if (port !== preferredPort) {
          console.warn(`Preferred port ${preferredPort} was busy. Server started on fallback port ${port}.`);
        }
        console.log(`Server running on http://localhost:${port}`);
        resolve(server);
      });

      server.once('error', (error) => {
        if (error.code === 'EADDRINUSE' && remainingRetries > 0) {
          console.warn(`Port ${port} is already in use. Trying port ${port + 1}... (${remainingRetries} retries left)`);
          tryListen(port + 1, remainingRetries - 1);
          return;
        }

        if (error.code === 'EADDRINUSE') {
          reject(
            new Error(
              `No open port found after trying ${MAX_PORT_RETRIES + 1} ports starting from ${preferredPort}. ` +
                'Set PORT to a free port or increase PORT_RETRY_LIMIT.'
            )
          );
          return;
        }

        reject(error);
      });
    };

    tryListen(preferredPort, retriesLeft);
  });

const startServer = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing. Create server/.env from server/.env.example and set MONGO_URI.');
    }

    await mongoose.connect(MONGO_URI);
    await listenWithPortFallback(DEFAULT_PORT);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
