const router = require("express").Router();

const User =
    require("../models/User");

const jwt =
    require("jsonwebtoken");



// ================= REGISTER =================
router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        // CHECK EXISTING USER
        const existingUser =
            await User.findOne({
                email:
                    email.toLowerCase()
            });

        if (existingUser) {

            return res.status(400).json({

                message:
                    "User already exists"

            });
        }


        // CREATE USER
        const user = new User({

            name,

            email:
                email.toLowerCase(),

            password,

            role
        });

        await user.save();


        res.status(201).json({

            message:
                "Registered Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message

        });
    }
});



// ================= LOGIN =================
router.post("/login", async (req, res) => {

    try {

        const email =
            req.body.email.toLowerCase();

        const password =
            req.body.password;


        // FIND USER
        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(400).json({

                message:
                    "Invalid Credentials"

            });
        }


        // CHECK PASSWORD
        if (user.password !== password) {

            return res.status(400).json({

                message:
                    "Invalid Credentials"

            });
        }


        // CREATE TOKEN
        const token =
            jwt.sign(

                {
                    id: user._id
                },

                "secret",

                {
                    expiresIn: "7d"
                }
            );


        res.json({

            message:
                "Login Successful",

            token,

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message

        });
    }
});

module.exports = router;