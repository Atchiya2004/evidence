require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const phishingRoutes = require("./routes/phishingRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/case", caseRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/phishing", phishingRoutes);
app.use("/api/report", reportRoutes);

app.listen(5000, () =>
  console.log("🚀 Server running on port 5000")
);