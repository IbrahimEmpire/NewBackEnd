import bcrypt from "bcrypt";
import express from 'express'
import jwt from 'jsonwebtoken';
import {genPasword,createUser, CheckUser } from '../helper.js'


const router = express.Router()

// router.get("/signin", async(req, res)=>{
//     res.send(users)
// })


router.post('/signin', async(req, res)=> {
    const {userName, password} = req.body
    const isUser = await CheckUser(userName)
    if(isUser){
        res.status(400).send({message: "userName already taken"})
        return
    }
    if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(password)){
res.status(404).send({message: "More need Strong Password"})
return
    }
    const hashPassword = await genPasword(password)
    const result = await createUser(userName, hashPassword)

    
      res.send(result)
    })

router.post("/login", async(req, res)=>{
    const {userName, password} = req.body
    const userFromDb = await CheckUser(userName)
    if(!userFromDb){
        res.status(400).send({message: "Involid UserName"})
       return
    }
    const storedPassword = userFromDb.password
    const matchPassword = await bcrypt.compare(password, storedPassword)
    if(!matchPassword){
        res.status(400).send({message: "involid Password"})
        return
    }

    const token = jwt.sign({id: userFromDb._id}, process.env.SECRET_KEY)

    res.send({message: "succesfull login",token})
})




    export const userRouter = router