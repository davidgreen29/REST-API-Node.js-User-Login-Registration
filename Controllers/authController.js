const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req,res) =>{
    const {username, email, password} =req.body;
        if(!username || !email || !password){
            return res.status(400).json({'message': 'Username, email, and password required'});
        }

    const foundUser = await User.findOne({username}).exec();
        if(!foundUser){
            return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, foundUser.password);
        if(match){
            const accessToken = jwt.sign(
                {
                "UserInfo": {
                    "username": foundUser.username,
                    "userId": foundUser._id
                }
            },process.env.ACCESS_TOKEN,
            { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            { 
                "username": foundUser.username,
                "userId":foundUser._id
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' }
        );
       
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None',secure: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({accessToken});

    } else {
        res.sendStatus(401);
    }
}

module.exports ={handleLogin}

       