import {
  getAllLogs,
  getUserLogs,
  deleteLog
} from "../services/audit.service.js";

export const viewLogs = async (req, res) => {
  const logs = await getAllLogs();
  res.json(logs);
};

export const viewUserLogs = async (req, res) => {
  const logs = await getUserLogs(req.params.userId);
  res.json(logs);
};

export const removeLog = async (req, res) => {
  await deleteLog(req.params.id);
  res.json({ message: "Audit log deleted" });
};
