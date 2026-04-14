import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import resourceRoutes from "./routes/resource.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import auditRoutes from "./routes/audit.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/audit", auditRoutes);
app.use("/resource",resourceRoutes);
app.use("/bookings", bookingRoutes)

// Temporary root route to test server is working
app.get("/", (req, res) => {
  res.send("Server is running and ready to test DB connection!");
});

export default app;
