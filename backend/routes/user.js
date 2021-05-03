const express = require("express");
const path = require("path")
const pool = require("../config");
const joi = require('joi')


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

router.delete("/user/:id", async function(req, res, next){
    const uid = req.params.id;
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query("DELETE FROM comment WHERE member_id = ?;", [uid])
        await conn.query("DELETE FROM report WHERE member_id = ?;", [uid])
        await conn.query("DELETE FROM status WHERE member_id = ?;", [uid])
        let [result, _] = await conn.query("DELETE FROM members WHERE member_id = ?;", [uid])
        res.json({message: `ดำเนินการลบแล้ว`})
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.put("/user/level", async function(req, res, next){
    const type = req.body.level;
    const sid = req.body.sid;
    let msg = ""
    if (type == "teacher"){
        msg = "ครู"
    }else{
        msg = "นักเรียน"
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query("UPDATE members SET member_level=? WHERE member_id = ?;", [type, sid])
        res.json({message: `ตั้งบทบาทเป็น ${msg} แล้ว`})
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

const search = (value, helpers) => {
    if(value[0] == " "){
        throw new joi.ValidationError("spacebar at first string is not allowed")
    }
}

const searchSchema = joi.object({
    
    id: joi.string().required().custom(search)
    
    
    
    
    
})

router.get("/user/search/:id", async function(req, res, next){
    try{
        await searchSchema.validateAsync(req.params, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err);
    }

    const key = '%' + req.params.id + '%'
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let [result, _] = await conn.query(`SELECT * FROM members WHERE member_id LIKE ?
        OR member_fname LIKE ?
        OR member_lname LIKE ?
         ORDER BY member_id ASC;`, [key, key, key])
        res.json(result)
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const no_validate = (value, helpers) => {
    if(!(value.match(/[0-9]{2}/) && !(value.match(/^[a-zA-Z]+$/)))){
        throw new joi.ValidationError("Please insert the number correctly (2 digits)")
    }
    else if(parseInt(value) > 50){
        throw new joi.ValidationError("Limit number is 50 only")
    }
    
}

const pass_validate = (value, helpers) => {
    if(!(value.match(/[0-9]/) && value.match(/[a-z]/) && value.match(/[A-Z]/) )){
        throw new joi.ValidationError("Password must be harder")
    }
    else if(value.length < 5){
        throw new joi.ValidationError("Password must contain at least 5 character")
    }

    return value


    }



    const level = (value, helpers) => {
        if(value != "student" && value != "teacher"){
            throw new joi.ValidationError("Wrong Level type")
        }
        return value
    }

    const number = (value, helpers) => {
        if(value[0] == 0 || value == ""){
            throw new joi.ValidationError("Please insert number correctly")
        }
        return value
    }
    const fname = (value, helpers) => {
        if(value.match(/[0-9]/)){
            throw new joi.ValidationError("No numeric allowed")
        }
        return value
    }
    const lname = (value, helpers) => {
        if(value.match(/[0-9]/)){
            throw new joi.ValidationError("No numeric allowed")
        }
        return value
    }


const upuserSchema = joi.object({
    
    
    member_user: joi.string().required().max(8).min(8),
    member_fname: joi.string().required().max(30).custom(fname),
    member_lname: joi.string().required().max(30).custom(lname),
    member_class: joi.string().required().pattern(/[1-6]{1}[/]{1}[1-6]{1}/),
    member_no: joi.number().required().min(1).max(60).integer().custom(number),
    member_dob: joi.date().iso().max(Date.now()).required(),
    member_address: joi.string().required().min(20).max(510),
    member_level: joi.string().required().custom(level),
    member_password: joi.string().required().min(5).max(15).custom(pass_validate),
    member_id: joi.any().required(),
    member_img: joi.any().allow(""),
    member_timestamp: joi.any().allow(""),
    sid: joi.any().required(),
    
    
    
    
})

router.put("/user", async function(req, res, next){

    try{
        await upuserSchema.validateAsync(req.body.form, { abortEarly: false})
    } catch (err){
        return res.json({ message: err.message, status: false });
    }

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