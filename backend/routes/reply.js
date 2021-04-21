const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/reply", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("SELECT * FROM report_feedback ORDER BY reply_id ASC;");
        res.json(rows);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})



exports.router = router;