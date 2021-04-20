const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

// coding here !!
router.get("/social", async function(req, res, next){

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("SELECT * FROM social ORDER BY social_id DESC;")
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