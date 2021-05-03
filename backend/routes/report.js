const express = require("express");
const pool = require("../config");
const joi = require('joi');

router = express.Router();

const reportSchema = joi.object({
    
    
    head: joi.string().required().min(5).max(20),
    body: joi.string().required().min(10),
    sid: joi.any().required()
    
    
    
    
})


router.post("/report", async function (req, res, next) {

    try{
        await reportSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err)
    }


    const head = req.body.head;
    const body = req.body.body;
    const sid = req.body.sid;

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("INSERT INTO report (report_topic, report_detail, member_id) VALUES (?, ?, ?)", [head, body, sid]);
        res.json({message: "success"})
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
        let [rows, _] = await conn.query("SELECT * FROM report ORDER BY report_id ASC;");
        let [rpl, __] = await conn.query("SELECT * FROM report_feedback ORDER BY reply_id ASC;");
        res.json({rp: rows, rpl: rpl})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

})

const search = (value, helpers) => {
    if(value[0] == " "){
        throw new joi.ValidationError("spacebar at first string is not allowed")
    }
}


const searchSchema = joi.object().keys({
    sr: joi.string().required().custom(search)
})

router.get("/report/search/:id", async function (req, res, next) {

    try{
        await searchSchema.validateAsync(req.papams, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err);
    }

    const key = '%' + req.params.id + '%'
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query(`SELECT * FROM report WHERE report_topic LIKE ? ORDER BY member_id ASC;`, [key])
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }

})

exports.router = router;