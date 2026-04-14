import Resource from "../models/Resource.js";

export const createResource = async (data, userId) => {
  return await Resource.create({
    ...data,
    createdBy: userId
  });
};

export const getAllResources = async () => {
  return await Resource.find({ isActive: true });
};

export const deleteResource = async (id) => {
  return await Resource.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

// optional deal with restoring when data set to false
export const restoreResource = async (id) => {
  return await Resource.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
};