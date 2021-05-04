const express = require("express");
const path = require("path")
const pool = require("../config");
const joi = require('joi')

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads/grace");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

// coding here !!
router.get("/grace", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM grace JOIN members USING (member_id) ORDER BY grace_id ASC;")
        res.json(result[0])
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

// coding here !!
const searchSchema = joi.object().keys({
    sr: joi.string().required().custom(search)
})

router.get("/grace/search/:sr", async function (req, res, next) {

    try{
        await searchSchema.validateAsync(req.params, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err)
    }

    const key = '%' + req.params.sr + '%'
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let result = await conn.query(`SELECT * FROM grace JOIN members USING (member_id)
        WHERE grace_id LIKE ?
        OR members.member_fname LIKE ?
        OR members.member_lname LIKE ?
        ORDER BY grace_id ASC;`, [key, key, key])
        res.json(result[0])
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.get("/grace/:id", async function (req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let result = await conn.query("SELECT * FROM grace JOIN members USING (member_id) WHERE grace_id = ?;", [req.params.id])
        res.json(result[0])
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const upgrace =  (value, helpers) => {
    if (!(value == "รอการอนุมัติ" || value == "ผ่าน" || value == "ไม่ผ่าน")){
        throw new joi.ValidationError("Wrong status type")
    }
    
}


const upgraceSchema = joi.object({
        value: joi.string().required().custom(upgrace)
})


router.put("/grace/:id", async function (req, res, next) { 

    try{
        await upgraceSchema.validateAsync(req.body, { abortEarly: false})
        
    } catch (err){
        return res.status(400).json(err)
    }
    
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query("UPDATE grace SET grace_check=? WHERE grace_id=?;", [req.body.value, req.params.id])
        res.json({ message: 'อัปเดตสถานะการตรวจเป็น ' + req.body.value + ' แล้ว' })
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.delete("/grace/:id", async function (req, res, next) { 
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query("DELETE FROM grace WHERE grace_id=?;", [req.params.id])
        res.json({ message: 'ลบบันทึกนี้แล้ว' })
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
    } finally {
        conn.release();
    }
})

const graceSchema = joi.object({
    time: joi.string().required().pattern(/[0-2]{1}[0-9]{1}:[0-6]{1}[0-9]{1}/),
    date: joi.date().iso().max(Date.now()).required(),
    detail: joi.string().required(),
    agency: joi.string().required().max(50),
    sid: joi.any().required(),
})

router.post("/grace", upload.array("myImage", 5), async function (req, res, next) {

    try{
        await graceSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        return res.status(400).json(err)
    }



    if (req.method == "POST") {
        const file = req.files;
        let pathArray = [];
        if (!file) {
            return res.status(400).json({ message: "โปรดอัปโหลดรูปความดี" });
        }
        const time = req.body.time;
        const date = req.body.date;
        const detail = req.body.detail;
        const agency = req.body.agency;
        const sid = req.body.sid;

        const conn = await pool.getConnection();
        await conn.beginTransaction();

        try {

            let results = await conn.query("INSERT INTO grace (grace_time, grace_date, grace_detail, grace_agency, member_id) VALUES (?, ?, ?, ?, ?)",
                [time, date, detail, agency, sid]);
            const graceId = results[0].insertId;

            req.files.forEach((file, index) => {
                let path = [graceId, file.path.substring(6), index == 0 ? 1 : 0];
                pathArray.push(path);
            });

            await conn.query(
                "UPDATE grace SET grace_img = ? WHERE grace_id = ?;",
                [pathArray[0][1], graceId]
            );
            res.json({ message: 'บันทึกสำเร็จ', status: true })
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            return res.status(400).json(err);
        } finally {
            conn.release();
        }
    }
})

exports.router = router;