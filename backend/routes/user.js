const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

// coding here !!
router.get("/user/:id", async function(req, res, next){
    const uid = req.params.id;

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("SELECT * FROM members WHERE member_id = ?;", [uid])
        res.json(result[0])
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

exports.router = router;