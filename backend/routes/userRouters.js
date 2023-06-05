const express = require('express');
const userRouter = express();
const officeController = require("../controllers/userController")
const passport = require('passport')
require('../middlewares/PassportAuth')
userRouter.use(passport.initialize())

userRouter.post('/register', officeController.register)

userRouter.post('/login', officeController.login)

userRouter.get('/protected',passport.authenticate('jwt',{session:false}),(req,res)=>{
    return res.status(200).send({
        success:true,
        user:{
            id:req.user._id,
            email:req.user.email
        }
    })
})



module.exports=userRouter