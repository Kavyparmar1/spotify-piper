import userModel from "../model/user.model.js"
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import {publishToQueue} from '../broker/rabbit.js'


export async function registerController(req,res) {
    const{email,password,fullname:{firstName,lastName},role='user'} = req.body
    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        email,
        password:hash,
        fullname:{
            firstName,
            lastName
        },
        role
    })
    const token = jwt.sign({
        id:user._id,
        role:user.role,
        fullname:user.fullname
    },config.JWT_KEY)

    await publishToQueue("user_created",{
        id:user.id,
        email:user.email,
        fullname:user.fullname,
        role:user.role
    })
    res.cookie('token',token)
    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            role: user.role
        }
    })
}
export async function googleAuthCallback(req,res) {
    const user = req.user
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email:user.emails[0].value},
            {googleId:user.id}
        ]
    })
    if(isUserAlreadyExist){
        const token = jwt.sign({
            id:isUserAlreadyExist._id,
            fullname:isUserAlreadyExist.fullname,
            role:isUserAlreadyExist.role
        },config.JWT_KEY)
        res.cookie("token", token)
        return res.status(200).json({
             message: "User authenticated successfully",
             user: {
                 id: isUserAlreadyExist._id,
                 email: isUserAlreadyExist.email,
                 fullname: isUserAlreadyExist.fullname,
                 role: isUserAlreadyExist.role
             }
         })
    }

    
  const newUser = await userModel.create({
    email:user.emails[0].value,
    fullname:{
        firstName:user.name.givenName,
        lastName:user.name.familyName
    },
    googleId:user.id,
    role:'user'
  })
  await publishToQueue("user_created",{
    id:newUser.id,
    email:newUser.email,
    fullname:newUser.fullname,
    role: newUser.role
})
  const token = jwt.sign({
    id:newUser._id,
    fullname:newUser.fullname,
    role:newUser.role
  },config.JWT_KEY)

  res.cookie("token", token)
  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
      role: newUser.role
    }
  })
}