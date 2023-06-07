const express = require('express');
const userRouter = express();
const userController = require("../controllers/userController")
const fileController = require('../controllers/fileController')
const uploadfiles = require('../middlewares/Cloudinary')
const passport = require('passport')
require('../middlewares/PassportAuth')

userRouter.use(passport.initialize())

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.login)

userRouter.get('/protected',passport.authenticate('jwt',{session:false}),userController.authenticate)

userRouter.post('/googleLogin', userController.googleLogin)

userRouter.post('/googleLogin', userController.googleLogin)

userRouter.get('/user-data/:id',passport.authenticate('jwt',{session:false}),userController.getUserData)

userRouter.get('/user-data/:id',passport.authenticate('jwt',{session:false}),userController.getUserData)

userRouter.post('/file-process',passport.authenticate('jwt',{session:false}),uploadfiles,fileController.fileProcessing)


module.exports=userRouter