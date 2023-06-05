const user =require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();


module.exports={
    register: async (req,res,next)=>{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = user({
            email:req.body.email,
            password:hashedPassword
        })

        userData.save().then((user)=>{
             res.send({
                success:true,
                message:"user created successfully",
                user:{
                    id:user._id,
                    email:user.email
                }
             })
        }).catch((err)=>{
            res.send({
               success:false,
               message:"something went wrong",
               error:err
            })
       })
    },
     login : async (req, res,next) => {
        const data = req.body
        try {
            const userData = await user.findOne({ email: data.email })
            if (userData) {
                const passwordMatch = await bcrypt.compare(data.password, userData.password)
                if (passwordMatch) {
                    const payload = {
                        email: data.email,
                    };
                    jwt.sign(
                        payload,
                        process.env.USER_SECRET,
                        {
                            expiresIn: 3600000,
                        },
                        (err, token) => {
                            if (err) console.error("There is some error in token", err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                });
                            }
                        }
                    );
                } else {
                    res.json({ error: "Invalid email or password" })
                }
            } else {
                res.json({ error: "Invalid email or password" })
            }
    
        } catch (err) {
            next(err)
        }
    }
}