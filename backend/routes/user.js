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

router.get("/user", async function(req, res, next){
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("SELECT * FROM members ORDER BY member_id ASC;")
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.put("/user", async function(req, res, next){
    const profile = req.body.form;
    const user = req.body.form.member_user;
    const pass = req.body.form.member_password;
    const fname = req.body.form.member_fname;
    const lname = req.body.form.member_lname;
    const classes = req.body.form.member_class;
    const no = req.body.form.member_no;
    const dob = req.body.form.member_dob;
    const address = req.body.form.member_address;
    const level = req.body.form.member_level;

    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let result = await conn.query("UPDATE members SET member_user=?, member_password=?, member_fname=?, member_lname=?, member_class=?, member_no=?, member_dob=?, member_address=?, member_level=? WHERE member_id=?;",
        [user, pass, fname, lname, classes, no, dob, address, level, req.body.form.member_id])
        res.json({message: "อัปเดตข้อมูลแล้ว"})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

exports.router = router;