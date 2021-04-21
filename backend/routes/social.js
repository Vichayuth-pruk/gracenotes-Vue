const express = require("express");
const path = require("path")
const pool = require("../config");

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

router.get("/social/search/:id", async function(req, res, next){
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

router.put("/social/:id", async function(req, res, next){
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

router.post("/social", async function(req, res, next){
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