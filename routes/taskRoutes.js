import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", authMiddleware, async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;
