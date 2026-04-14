// // // import mongoose from "mongoose";
// // // import dotenv from "dotenv";
// // // import Role from "./models/Role.js"; // make sure path is correct

// // // import Resource from "./models/Resource"

// // // dotenv.config();

// // // const roles = [
// // //   { name: "Student", description: "Default student role" },
// // //   { name: "Faculty", description: "Faculty member" },
// // //   { name: "Admin", description: "Department admin" },
// // //   { name: "SuperAdmin", description: "System administrator" }
// // // ];

// // // mongoose.connect(process.env.MONGO_URI)
// // //   .then(async () => {
// // //     console.log(" Connected to DB:", mongoose.connection.db.databaseName);

// // //     for (const role of roles) {
// // //       const exists = await Role.findOne({ name: role.name });
// // //       if (!exists) {
// // //         await Role.create(role);
// // //         console.log(`Role created: ${role.name}`);
// // //       } else {
// // //         console.log(`ℹ Role already exists: ${role.name}`);
// // //       }
// // //     }

// // //     mongoose.disconnect();
// // //   })
// // //   .catch(err => console.error("❌ Error:", err));






// // // seeding Resource department






// // // import mongoose from "mongoose";
// // // import Resource from "./models/Resource.js"; // adjust the path if needed
// // // import dotenv from "dotenv";

// // // dotenv.config();

// // // // 1. Connect to MongoDB Atlas

// // // try {
// // //   await mongoose.connect(process.env.MONGO_URI);
// // //   console.log("MongoDB Connected");
// // // } catch (err) {
// // //   console.error("MongoDB connection error:", err);
// // // }


// // // // 2. Seed data
// // // const resources = [
// // //   {
// // //     name: "Physics Lab",
// // //     type: "LAB",
// // //     department: "Physics",
// // //     isActive: true
// // //   },
// // //   {
// // //     name: "Chemistry Lab",
// // //     type: "LAB",
// // //     department: "Chemistry",
// // //     isActive: true
// // //   },
// // //   {
// // //     name: "Main Classroom 101",
// // //     type: "CLASSROOM",
// // //     department: "Mathematics",
// // //     isActive: true
// // //   },
// // //   {
// // //     name: "Projector X200",
// // //     type: "EQUIPMENT",
// // //     department: "Media",
// // //     isActive: true
// // //   }
// // // ];

// // // // 3. Insert data
// // // const seedDB = async () => {
// // //   try {
// // //     await Resource.deleteMany({}); // optional: clear existing resources
// // //     const createdResources = await Resource.insertMany(resources);
// // //     console.log("Seeded resources:", createdResources);
// // //     mongoose.connection.close();
// // //   } catch (err) {
// // //     console.error("Error seeding data:", err);
// // //     mongoose.connection.close();
// // //   }
// // // };

// // // seedDB();



// // // codes about seeding Bookings



// // // bookingsSeed.js

// // // import mongoose from "mongoose";
// // // import dotenv from "dotenv";
// // // import Booking from "./models/Booking.js";
// // // import Resource from "./models/Resource.js";
// // // import User from "./models/User.js";

// // // dotenv.config();

// // // const NUM_BOOKINGS = 50; // number of bookings to seed

// // // // Helper function to generate random dates
// // // const randomDate = (start, end) => {
// // //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// // // };

// // // // Helper to pick a random item from an array
// // // const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // // const seedBookings = async () => {
// // //   try {
// // //     await mongoose.connect(process.env.MONGO_URI);
// // //     console.log(" Connected to MongoDB");

// // //     // Fetch all users and resources
// // //     const users = await User.find();
// // //     const resources = await Resource.find();

// // //     if (users.length === 0 || resources.length === 0) {
// // //       console.log("No users or resources found. Make sure you seeded them first.");
// // //       mongoose.connection.close();
// // //       return;
// // //     }

// // //     // Clear existing bookings
// // //     await Booking.deleteMany({});
// // //     console.log("🗑️ Cleared existing bookings");

// // //     const bookings = [];

// // //     for (let i = 0; i < NUM_BOOKINGS; i++) {
// // //       const requestedBy = randomItem(users);
// // //       const resource = randomItem(resources);

// // //       // Random start and end times within the next 30 days
// // //       const startTime = randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
// // //       const endTime = new Date(startTime.getTime() + (1 + Math.floor(Math.random() * 3)) * 60 * 60 * 1000); // 1-3 hour booking

// // //       const status = randomItem(["PENDING", "APPROVED", "REJECTED"]);
// // //       const approvedBy = status === "APPROVED" ? randomItem(users)._id : null;

// // //       bookings.push({
// // //         resourceId: resource._id,
// // //         requestedBy: requestedBy._id,
// // //         startTime,
// // //         endTime,
// // //         status,
// // //         approvedBy
// // //       });
// // //     }

// // //     const createdBookings = await Booking.insertMany(bookings);
// // //     console.log(` Seeded ${createdBookings.length} bookings`);

// // //     mongoose.connection.close();
// // //   } catch (err) {
// // //     console.error(" Error seeding bookings:", err);
// // //     mongoose.connection.close();
// // //   }
// // // };

// // // seedBookings();



// // // code used to seed permissions


// // import mongoose from "mongoose";

// // // 1. Define the permissions array
// // const permissions = [
// //   "booking_create",
// //   "booking_viewOwn",
// //   "booking_approve",
// //   "booking_reject",
// //   "booking_viewAll",
// //   "resource_create",
// //   "resource_view",
// //   "resource_delete",
// //   "auditLog_view",
// //   "auditLog_create",
// //   "auditLog_delete",
// //   "auditLog_viewUser"
// // ];

// // // 2. Define Mongoose schema and model
// // const permissionSchema = new mongoose.Schema({
// //   name: { type: String, required: true, unique: true }
// // });

// // const Permission = mongoose.model("Permission", permissionSchema);

// // // 3. Connect to MongoDB and seed the collection
// // async function seedPermissions() {
// //   try {
// //     const mongoURI = "mongodb+srv://fiacredeveloper_db_user:AIrQa1hTIzdvkVhZ@cluster0.nbquonl.mongodb.net/alu?appName=Cluster0"; // ← replace with your DB name
// //     await mongoose.connect(mongoURI); // no extra options needed

// //     console.log("Connected to MongoDB");

// //     // Clear existing permissions (optional)
// //     await Permission.deleteMany({});

// //     // Insert permissions
// //     const permissionDocs = permissions.map(name => ({ name }));
// //     await Permission.insertMany(permissionDocs);

// //     console.log("Permissions seeded successfully!");
    
// //     // Disconnect after seeding
// //     await mongoose.disconnect();
// //   } catch (error) {
// //     console.error("Error seeding permissions:", error);
// //   }
// // }

// // seedPermissions();


// // // codes used to seed role with permissions included

// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import Permission from "./models/Permission.js";
// // import Role from "./models/Role.js";

// // dotenv.config();

// // const MONGO_URI = process.env.MONGO_URI;

// // /**
// //  * MASTER PERMISSIONS LIST (SOURCE OF TRUTH)
// //  */
// // const permissionsList = [
// //   // Booking permissions
// //   "booking_create",
// //   "booking_viewOwn",
// //   "booking_approve",
// //   "booking_reject",
// //   "booking_viewAll",

// //   // Resource permissions
// //   "resource_create",
// //   "resource_view",
// //   "resource_delete",

// //   // Audit Log permissions
// //   "auditLog_view",
// //   "auditLog_create",
// //   "auditLog_delete",
// //   "auditLog_viewUser"
// // ];

// // const runSeed = async () => {
// //   await mongoose.connect(MONGO_URI);
// //   console.log("MongoDB connected");

// //   /**
// //    * STEP 1: ENSURE ALL PERMISSIONS EXIST
// //    */
// //   const permissionDocs = {};

// //   for (const name of permissionsList) {
// //     let perm = await Permission.findOne({ name });
// //     if (!perm) {
// //       perm = await Permission.create({
// //         name,
// //         description: `${name} permission`
// //       });
// //       console.log(`➕ Permission created: ${name}`);
// //     }
// //     permissionDocs[name] = perm._id;
// //   }

// //   /**
// //    * STEP 2: DEFINE ROLE → PERMISSIONS MAP
// //    */
// //   const rolePermissionMap = {
// //     Student: [
// //       "booking_create",
// //       "booking_viewOwn",
// //       "resource_view"
// //     ],

// //     Faculty: [
// //       "booking_create",
// //       "booking_viewOwn",
// //       "booking_approve",
// //       "booking_reject",
// //       "resource_create",
// //       "resource_view"
// //     ],

// //     Admin: permissionsList,       // FULL ACCESS
// //     SuperAdmin: permissionsList   // FULL ACCESS + BYPASS
// //   };

// //   /**
// //    * STEP 3: UPDATE EXISTING ROLES
// //    */
// //   for (const [roleName, permNames] of Object.entries(rolePermissionMap)) {
// //     const role = await Role.findOne({ name: roleName });

// //     if (!role) {
// //       console.log(`Role not found: ${roleName} (skipped)`);
// //       continue;
// //     }

// //     role.permissions = permNames.map(p => permissionDocs[p]);
// //     await role.save();

// //     console.log(` Role updated: ${roleName}`);
// //   }

// //   console.log(" SEEDING COMPLETE — ALL ROLES NOW HAVE PERMISSIONS");
// //   process.exit(0);
// // };

// // runSeed().catch(err => {
// //   console.error(" Seed failed:", err);
// //   process.exit(1);
// // });


// // data to seed auditlog collection on MongoDb

// // seedAuditLogs.js
// import mongoose from "mongoose";
// import AuditLog from "./models/AuditLog.js"; // adjust path if needed
// import dotenv from "dotenv";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || "your_mongodb_atlas_connection_string_here";

// const seedAuditLogs = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to MongoDB Atlas");

//     // Example user IDs (replace with actual User ObjectIds from your DB)
//     const userId1 = new mongoose.Types.ObjectId();
//     const userId2 = new mongoose.Types.ObjectId();

//     // Only two sample audit logs
//     const auditLogs = [
//       {
//         action: "RESOURCE_CREATED",
//         performedBy: userId1,
//         targetUser: userId1,
//         resourceType: "Resource",
//         resourceId: new mongoose.Types.ObjectId(),
//         details: "Created resource: Projector"
//       },
//       {
//         action: "RESOURCE_DEACTIVATED",
//         performedBy: userId2,
//         targetUser: userId2,
//         resourceType: "Resource",
//         resourceId: new mongoose.Types.ObjectId(),
//         details: "Deactivated resource: Conference Room"
//       }
//     ];

//     // Optional: clear existing logs
//     await AuditLog.deleteMany({});
//     console.log("Cleared existing audit logs");

//     // Insert the two logs
//     await AuditLog.insertMany(auditLogs);
//     console.log("Seeded 2 audit logs successfully");

//     await mongoose.connection.close();
//     console.log("MongoDB connection closed");
//   } catch (error) {
//     console.error("Error seeding audit logs:", error);
//     await mongoose.connection.close();
//   }
// };

// seedAuditLogs();


