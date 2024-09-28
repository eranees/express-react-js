import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pool from "./database/db.js";

dotenv.config();
const PORT = process.env.APP_PORT || 3000;
const APP_HOST = process.env.APP_HOST || '127.0.0.1';

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    appName: process.env.APP_NAME,
    version: process.env.APP_VERSION
  });
});

(async () => {
  try {
    await pool.connect();
    console.log(`🚀 DB connected successfully http://${pool.options.host}:${pool.options.port}`);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://${APP_HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("DB connection error:", error.stack);
  }
})();

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});