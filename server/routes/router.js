const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");

// create user Registration api
router.post("/register", async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            return res.status(422).json({ error: "This Email is Already Exist" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password do not match" });
        } else {
            const finalUser = new userdb({
                name, email, password, cpassword
            });

            // password hashing part here
            const storeData = await finalUser.save();
            res.status(201).json({ status: 201, storeData });
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});

// user Login 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const userValid = await userdb.findOne({ email: email });

        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                return res.status(422).json({ error: "Invalid Details" });
            } else {
                // token generate
                const token = await userValid.generateAuthToken();

                // cookie generate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                };
                res.status(201).json({ status: 201, result });
            }
        } else {
            res.status(422).json({ error: "Invalid Details" });
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error", error);
    }
});

// API to get all users
router.get("/users", async (req, res) => {
    try {
        const users = await userdb.find();
        res.status(200).json({ status: 200, users });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
