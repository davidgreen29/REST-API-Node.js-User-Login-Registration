const User = require('../Model/User');
const bcrypt = require('bcrypt');


const handleNewUser = async(req,res)=>{
     const {username,email,password} = req.body;
     if(!username || !password || !email) 
     return res.status(400).json({'messeage': 'Username, email, and password required'});

     const duplicate = await User.findOne({$or:[{username}, {email}]}).exec();
    if(duplicate) return res.sendStatus(409);


    try{
     const hashedPassword = await bcrypt.hash(password, 10);

     const result = await User.create({
          "username": username,
          "email":email,
          "password":hashedPassword
     });
    res.status(201).json({'success': `New user ${username} created`})
    }catch(err){
     res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};
