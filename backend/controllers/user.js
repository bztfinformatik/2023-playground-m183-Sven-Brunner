const { HTTP_STATUS_OK } = require("../util/const");
const db = require("../util/db");
const { User, Posting, Vote } = require("../models/main");
const bcrypt = require('bcrypt');




exports.SignUp = async (req,res,next) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.pwd, salt);
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        pwd: hashedPassword,
        avatar: req.body.avatar,
        
    };
    // createUser

    const existingUser = await User.findOne({ where: { username: newUser.username } });
 

    if(existingUser !== null){
       
      res.status(409).json({
        "errorMessage": "User already exists",
      });
        
    }
    else{
   
      let user =  await User.create({
        
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        pwd: newUser.pwd,
        avatar: newUser.avatar,
       
      });
    
      await db.sync({  });

      res.status(201).json({
        "user": user,
      });
    }

};

exports.LogIn = async (req, res, next) =>{

};