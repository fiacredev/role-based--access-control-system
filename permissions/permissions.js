const permissions = [
  // Booking permissions
  "booking_create",       // create a booking
  "booking_viewOwn",      // view own bookings
  "booking_approve",      // approve a booking
  "booking_reject",       // reject a booking
  "booking_viewAll",      // view all bookings

  // Resource permissions
  "resource_create",      // create a resource
  "resource_view",        // view resource details
  "resource_delete",      // delete a resource

  // Audit Log permissions
  "auditLog_view",        // view audit logs
  "auditLog_create",      // create an audit log entry
  "auditLog_delete",      // delete audit log entries (admin only)
  "auditLog_viewUser"     // view audit logs of a specific user
];

export default permissions;
