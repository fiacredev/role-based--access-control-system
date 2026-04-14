import AuditLog from "../models/AuditLog.js";
import {
  createResource,
  getAllResources,
  deleteResource,
  restoreResource
} from "../services/resource.service.js";



// create a resource
export const create = async (req, res) => {
  try {
    const resource = await createResource(req.body, req.user._id);


    // audit log for resource creation
    await AuditLog.create({
      action: "RESOURCE_CREATED",
      performedBy: req.user._id,
      targetUser: req.user._id,
      resourceType: "Resource",
      resourceId: resource._id,
      details: `Resource created with name: ${resource.name}`
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// get all resources
export const getAll = async (req, res) => {
  const resources = await getAllResources();

  // optional:  Audit log for viewing all resources
  await AuditLog.create({
    action: "RESOURCES_VIEWED",
    performedBy: req.user._id,
    targetUser: req.user._id,
    resourceType: "Resource",
    resourceId: null, // No specific resource
    details: `Viewed all resources`
  });

  res.json(resources);
};


// Deactivate a resource
export const remove = async (req, res) => {
  const resource = await deleteResource(req.params.id);
  
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (!resource.isActive) {
    return res.json({ message: "Resource already deactivated" });
  }

  // audit log for deactivation
  await AuditLog.create({
    action: "RESOURCE_DEACTIVATED",
    performedBy: req.user._id,
    targetUser: req.user._id,
    resourceType: "Resource",
    resourceId: resource._id,
    details: `Resource deactivated: ${resource.name}`
  });

  res.json({ message: "Resource deactivated" });
};

// restore a resource
export const restore = async (req, res) => {
  const resource = await restoreResource(req.params.id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  // audit log for restoration
  await AuditLog.create({
    action: "RESOURCE_RESTORED",
    performedBy: req.user._id,
    targetUser: req.user._id,
    resourceType: "Resource",
    resourceId: resource._id,
    details: `Resource restored: ${resource.name}`
  });

  res.json({ message: "Resource restored" });
};
