const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')


// router.get('/',(req,res)=>{
//     res.send("hello")
// })


router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body
    if(!name || !email || !password){
        return res.status(404).json({error:"please add all the feilds"})
    }
    else{
        //res.json({message:"sucessfully posted"})
        User.findOne({email:email})
        .then((savedUser)=>{

            if(savedUser){
                return res.status(404).json({error:"user already exists with this email id"})
            }
            else{
                bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    const user = new User({
                        name,
                        email,
                        password:hashedPassword,
                        pic
                    })
                    user.save()
                    .then(user=>{
                        res.json({message:"saved sucessfully"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(404).json({error:"Please enter your credentials"})
    }
    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(404).json({error:"Invalid email id or password"})
            }
            else{
                bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        // res.json({message:"sucessfully signed in"})
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,name,email,followers,following,pic} = savedUser
                        res.json({token,user:{_id,name,email,followers,following,pic}})
                    }
                    else{
                        return res.status(404).json({error:"Invalid email id or password "})
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        })
    }
})

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send('hello user')
// })

module.exports = router