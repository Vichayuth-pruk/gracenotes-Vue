const express = require("express");
const path = require("path")
const pool = require("../config");
const bcrypt = require('bcrypt');

router = express.Router();

// Require multer for file upload
const multer = require("multer");
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
            res.json({message: 'สมัครสมาชิกสำเร็จ', status: true})
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