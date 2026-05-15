const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.createUser = async(req,res)=>{

const {name,email,password,role} = req.body

const hashed = await bcrypt.hash(password,10)

await new User({name,email,password:hashed,role}).save()

res.json("User created")
}