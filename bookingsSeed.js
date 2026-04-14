import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";
import Resource from "./models/Resource.js";
import User from "./models/User.js";

dotenv.config();

const NUM_BOOKINGS = 50; // number of bookings to seed

// Helper function to generate random dates
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to pick a random item from an array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Fetch all users and resources
    const users = await User.find();
    const resources = await Resource.find();

    if (users.length === 0 || resources.length === 0) {
      console.log("⚠️ No users or resources found. Make sure you seeded them first.");
      mongoose.connection.close();
      return;
    }

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log("🗑️ Cleared existing bookings");

    const bookings = [];

    for (let i = 0; i < NUM_BOOKINGS; i++) {
      const requestedBy = randomItem(users);
      const resource = randomItem(resources);

      // Random start and end times within the next 30 days
      const startTime = randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      const endTime = new Date(startTime.getTime() + (1 + Math.floor(Math.random() * 3)) * 60 * 60 * 1000); // 1-3 hour booking

      const status = randomItem(["PENDING", "APPROVED", "REJECTED"]);
      const approvedBy = status === "APPROVED" ? randomItem(users)._id : null;

      bookings.push({
        resourceId: resource._id,
        requestedBy: requestedBy._id,
        startTime,
        endTime,
        status,
        approvedBy
      });
    }

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`✅ Seeded ${createdBookings.length} bookings`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding bookings:", err);
    mongoose.connection.close();
  }
};

seedBookings();
