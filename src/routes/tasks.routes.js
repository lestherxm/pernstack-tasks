const { Router } = require("express");
const {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask,
} = require("../controllers/tasks.controller");
const router = Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getSingleTask);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

module.exports = router;
