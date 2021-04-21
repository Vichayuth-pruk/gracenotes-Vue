const express = require("express");
const pool = require("../config");

router = express.Router();


router.post("/report", async function (req, res, next) {
    const head = req.body.head;
    const body = req.body.body;
    const sid = req.body.sid;

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("INSERT INTO report (report_topic, report_detail, member_id)", [head, body, sid]);
        res.status(204)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

})

router.get("/report", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("SELECT * FROM report ORDER BY report_id ASC", );
        res.json(rows)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

})

exports.router = router;