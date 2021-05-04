const express = require("express");
const path = require("path")
const pool = require("../config");
const bcrypt = require('bcrypt');
const joi = require('joi')

router = express.Router();



const pass_validate = (value, helpers) => {
    if(!(value.match(/[0-9]/) && value.match(/[a-z]/) && value.match(/[A-Z]/) )){
        throw new joi.ValidationError("Password must be harder")
    }
    else if(value.length < 5){
        throw new joi.ValidationError("Password must contain at least 5 character")
    }

    return value


    }

const user_validate = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT member_user FROM members WHERE member_user = ?",
         [value]
    )
    if(rows.length > 0){
        const message = "This user is alredy taken"
        throw new joi.ValidationError(message, { message })
        
    }
    return value
    
    }

const number = (value, helpers) => {
        if(value == 0 || value == ""){
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
    

    


const signupSchema = joi.object({
    
    
    user: joi.string().required().max(10).external(user_validate).pattern(/[0-9]/),
    fname: joi.string().required().max(30).custom(fname),
    lname: joi.string().required().max(30).custom(lname),
    classes: joi.string().required().max(5).pattern(/[1-6]{1}[/]{1}[1-6]{1}/),
    no: joi.number().required().min(1).max(60).integer().custom(number),
    dob: joi.date().iso().max(Date.now()).required(),
    address: joi.string().required(),
    pass: joi.string().required().min(5).max(50).custom(pass_validate),
    repass: joi.string().required().valid(joi.ref('pass')),
    
    
    
    
})

// Require multer for file upload
const multer = require("multer");
const { date } = require("joi");
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads/profile");
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
router.post("/register", upload.array("myImage", 5), async function (req, res, next) {


    try{
        await signupSchema.validateAsync(req.body, { abortEarly: false})
    } catch (err){
        return res.json({ message: err.message, status: false });
    }

    const file = req.files;
        
        let pathArray = [];
        if (!file) {
            return res.status(400).json({ message: "โปรดอัปโหลดรูปประจำตัว" });
        }

    


    if (req.method == "POST") {

        



        const file = req.files;
        
        let pathArray = [];
        if (!file) {
            return res.status(400).json({ message: "โปรดอัปโหลดรูปประจำตัว" });
        }
        
        const user = req.body.user;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const classes = req.body.classes;
        const no = req.body.no;
        const dob = req.body.dob;
        const address = req.body.address;
        const pass = req.body.pass;

        


        const conn = await pool.getConnection();
        await conn.beginTransaction();



        try {
            let [check_user, _] = await conn.query("SELECT member_user FROM members WHERE member_user = ?", [user]);
            if (check_user.length > 0) {
                await conn.rollback();
                return res.json({ message: "รหัสนักเรียนนี้ถูกใช้แล้ว", status: false });
            } else {
                let results = await conn.query("INSERT INTO members (member_user, member_password, member_fname, member_lname, member_class, member_no, member_dob, member_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [user, pass, fname, lname, classes, no, dob, address]);
                const memId = results[0].insertId;

                req.files.forEach((file, index) => {
                    let path = [memId, file.path.substring(6), index == 0 ? 1 : 0];
                    pathArray.push(path);
                });

                await conn.query(
                    "UPDATE members SET member_img = ? WHERE member_id = ?;",
                    [pathArray[0][1], memId]
                );
            }
            res.json({ message: 'สมัครสมาชิกสำเร็จ', status: true })
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