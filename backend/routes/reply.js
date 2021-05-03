const express = require("express");
const pool = require("../config");
const joi = require('joi')

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

router.delete("/reply/:id", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("DELETE FROM report_feedback WHERE reply_id=?;", [req.params.id]);
        res.json({message: "success"});
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const reportSchema = joi.object({
    
    
    detail: joi.string().required().min(5),
    sid: joi.any().required(),
    uid: joi.any().required()
    
    
    
    
})

router.post("/reply", async function (req, res, next) {

    try{
        await reportSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err)
    }

    const detail = req.body.detail;
    const sid = req.body.sid;
    const uid = req.body.uid;

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("INSERT INTO report_feedback (reply_detail, report_id, member_id) VALUES (?, ?, ?);", [detail, sid, uid]);
        res.json({message: "success"});
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})



exports.router = router;