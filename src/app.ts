import cors from "cors";
import express from "express";
import helmet from "helmet";
import { bot } from "./bot/bot";

export const createApp = async () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(bot.webhookCallback('/webhook'));

  app.get('/', (req, res) => {
    res.send('Server running');
  });

  return { app, bot };
};
