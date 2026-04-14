import Booking from "../models/Booking.js";
import AuditLog from "../models/AuditLog.js";

export const createBooking = async (data, userId) => {
  return await Booking.create({
    ...data,
    requestedBy: userId
  });
};

export const getMyBookings = async (userId) => {
  return await Booking.find({ requestedBy: userId })
    .populate("resourceId");
};

export const approveBooking = async (id, approverId) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: "APPROVED", approvedBy: approverId },
    { new: true }
  );

  if (!booking) {
    throw new Error("Booking not found");
  }

  await AuditLog.create({
    action: "BOOKING_APPROVED",
    performedBy: approverId,
    targetUser: booking.requestedBy,
    resourceType: "Booking",
    resourceId: booking._id,
    details: "Booking approved"
  });

  return booking;
};

export const rejectBooking = async (id, approverId) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: "REJECTED", approvedBy: approverId },
    { new: true }
  );

  if (!booking) {
    throw new Error("Booking not found");
  }

  await AuditLog.create({
    action: "BOOKING_REJECTED",
    performedBy: approverId,
    targetUser: booking.requestedBy,
    resourceType: "Booking",
    resourceId: booking._id,
    details: "Booking rejected"
  });

  return booking;
};
