import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
