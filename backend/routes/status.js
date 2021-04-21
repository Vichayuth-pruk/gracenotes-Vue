const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/status/social/:id", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("SELECT * FROM `status` WHERE social_id = ?;", [req.params.id]);
        res.json(rows);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.post("/status", async function (req, res, next) {
    const type = req.body.type
    const sid = req.body.sid
    const uid = req.body.uid

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("DELETE FROM `status` WHERE social_id=? AND member_id=?", [sid, uid]);
        let [rows, _] = await conn.query("INSERT INTO `status` (status_type, member_id, social_id) VALUES (?, ?, ?);", [type, uid, sid]);
        res.json(rows);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.delete("/status", async function (req, res, next) {
    const sid = req.query.sid
    const uid = req.query.uid

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("DELETE FROM `status` WHERE social_id=? AND member_id=?", [sid, uid]);
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