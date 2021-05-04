const express = require("express");
const path = require("path")
const pool = require("../config");
const joi = require('joi')

router = express.Router();

// coding here !!
router.get("/social", async function(req, res, next){

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("SELECT * FROM social ORDER BY social_id ASC;")
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.get("/social/:id", async function(req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("SELECT * FROM social WHERE social_id = ?;", [req.params.id])
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const search =  (value, helpers) => {
    if(value[0] == " "){
        throw new joi.ValidationError("spacebar at first string is not allowed")
    }
    

    

}

const searchSchema = joi.object().keys({
    id: joi.number().required().custom(search)
})

router.get("/social/search/:id", async function(req, res, next){

    try{
        await searchSchema.validateAsync(req.params, { abortEarly: false})
    } catch (err){
        console.log(req.params.id)
        return res.status(400).json(err)
    }

    const key = '%' + req.params.id + '%'
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query(`SELECT * FROM social
        WHERE social_id LIKE ?
        ORDER BY social_id ASC;`, [key])
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const upsocialSchema = joi.object({
    detail: joi.string().required(),
    sid: joi.any().required()
})

router.put("/social/:id", async function(req, res, next){

    try{
        await upsocialSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        console.log(req.body.sid)
        return res.status(401).json(err)
    }

    const detail = req.body.detail
    const sid = req.body.sid

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query(`UPDATE social SET social_detail=? WHERE social_id=? ;`, [detail, sid])
        res.json({message: "อัปเดตโพสต์แล้ว"})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.delete("/social/:id", async function(req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query(`DELETE FROM social WHERE social_id = ?;`, [req.params.id])
        res.json({message: "ดำเนินการลบโพสต์นี้แล้ว"})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const addsocialSchema = joi.object({
    img: joi.string().required(),
    detail: joi.string().required(),
    uid: joi.any().required()
})

router.post("/social", async function(req, res, next){

    try{
        await addsocialSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        console.log(req.body.sid)
        return res.status(401).json(err)
    }

    const img = req.body.img
    const detail = req.body.detail
    const uid = req.body.uid

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let results = await conn.query("INSERT INTO social (social_detail, social_img, member_id) VALUES (?, ?, ?);", [detail, img, uid])
        res.json({message: "เผยแพร่แล้ว", id: results[0].insertId})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

exports.router = router;