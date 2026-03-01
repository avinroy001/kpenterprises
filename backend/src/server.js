import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import leadsRouter from "./routes/leads.js";

const app = express();

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in environment variables.");
}

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN.split(",").map((x) => x.trim()),
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "kp-enterprises-backend" });
});

app.use("/api/leads", leadsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    ok: false,
    message: "Internal server error.",
  });
});

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Startup failed:", error);
  process.exit(1);
});
