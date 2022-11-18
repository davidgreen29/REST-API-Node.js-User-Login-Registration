const User = require('../Model/User');
const bcrypt = require('bcrypt');


const handleNewUser = async(req,res)=>{
     const {user,email,password} = req.body;
     if(!user || !password || !email) 
     return res.status(400).json({'messeage': 'Username, email, and password required'});

     const duplicate = await User.findOne($or[{username: user, email:email}]).exec();
    if(duplicate) return res.sendStatus(409);


    try{
     const hashedPassword = await bcrypt.hash(password, 10);

     const result = await User.create({
          "userName": user,
          "email":email,
          "password":hashedPassword
     });
    res.status(201).json({'success': `New user ${user} created`})
    }catch(err){
     res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};





