const express = require("express");
const pool = require("../config");
const joi = require('joi')

router = express.Router();



router.get("/comment/social/:id", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let [rows, _] = await conn.query("SELECT * FROM comment JOIN members USING (member_id) WHERE social_id = ? ORDER BY comment_id ASC;", [req.params.id]);
        res.json(rows);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.delete("/comment/:id", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("DELETE FROM comment WHERE comment_id = ?;", [req.params.id]);
        res.json({message: "success"});
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const commentSchema = joi.object({
    
    
    detail: joi.string().required(),
    sid: joi.any().required(),
    uid: joi.any().required()
    
    
    
    
})

router.post("/comment", async function (req, res, next) {

    try{
        await commentSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        console.log(req.body.detail)
        return res.status(400).json(err);
    }


    const detail = req.body.detail
    const sid = req.body.sid
    const uid = req.body.uid

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        await conn.query("INSERT INTO comment (comment_detail, social_id, member_id) VALUES (?, ?, ?);", [detail, sid, uid]);
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