import {
  createBooking,
  getMyBookings,
  approveBooking,
  rejectBooking
} from "../services/booking.service.js";

export const create = async (req, res) => {
  const { startTime, endTime, ...rest } = req.body;

  const booking = await createBooking(
    {
      ...rest,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    },
    req.user._id
  );

  res.status(201).json(booking);
};


export const myBookings = async (req, res) => {
  if (!req.user || !req.user._id)
  return res.status(401).json({ message: "Unauthorized" });

  console.log("req.user:", req.user);
  console.log("req.user._id:", req.user?._id);
  console.log("Filtering bookings for userId:", req.user._id.toString());

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const bookings = await getMyBookings(req.user._id);
  res.json(bookings);
};

export const approve = async (req, res) => {
  const booking = await approveBooking(req.params.id, req.user._id);
  res.json(booking);
};

export const reject = async (req, res) => {
  const booking = await rejectBooking(req.params.id, req.user._id);
  res.json(booking);
};
