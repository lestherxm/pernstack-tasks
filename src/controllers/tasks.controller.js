const pool = require("../postgres");

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT * FROM tasks");
        res.json(allTasks.rows);
    } catch (error) {
        next(error);
    }
};

const getSingleTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Tasks not found",
            });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const result = await pool.query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Tasks not found and couldn't delete that",
            });
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Tasks not found anc culdn't update that",
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask,
};
