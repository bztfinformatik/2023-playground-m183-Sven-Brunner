const { HTTP_STATUS_OK } = require("../util/const");
const db = require("../util/db");
const { User, Posting, Vote } = require("../models/main");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { JWTSECTRET} = require("../util/const");




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

 
  const user = await User.findOne(
    {
      where : {
        username : req.body.username
      }

    }
  );
  if(user === null){
    res.status(404).json({ message: 'User not found'});
  }
  else{
    let isAuthorized = await bcrypt.compare(req.body.pwd, user.pwd);
    if(!isAuthorized){
      res.status(401).json({
        "errorMessage" : "wrong password"
      });
    
    }
    else{
      let token =  jwt.sign({sub : user.id,
        iat: Date.now(),
        exp :Math.floor(Date.now() / 1000) + (3 * 60 *60 * 60)
      }, JWTSECTRET);
  
      res.status(200).json({
        token: token
      }
      );
    }
   
  }
  


  

};
exports.GetUser = async(req, res, next) =>{
  if(req.params.userId == undefined){
    return res.status(400).json({message: 'This userId is invalid'});
  }
  if(req.userId != req.params.userId){

    return res.status(401).json({ message: 'You are not authorized to access this user' });
    
  }

  const user = await User.findOne(
    {
      where : {
        id : req.params.userId
      }

    }
  );

  res.status(200).json({
    "user": user,
  });
}