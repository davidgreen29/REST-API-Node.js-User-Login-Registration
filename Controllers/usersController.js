const User = require('../Model/User')
const Weight = require('../Model/Weight')
const bcrypt = require('bcrypt')




// @desc Update a user
// @route PATCH /users

const updateUser = async (req, res) => {
    const { id, username, email, password } = req.body

    
    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await User.findOne({$or:[{username: user}, {email:email}]}).collation({ locale: 'en', strength: 2 }).lean().exec()

   
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate user' })
    }

    user.username = username
    user.email = email
    

    if (password) {
        
        user.password = await bcrypt.hash(password, 10)  
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}


// @route DELETE /users

const deleteUser = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    
    const weight = await Weight.findOne({ user: id }).lean().exec()
    if (weight) {
        weight.delete();
    }

    
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    updateUser,
    deleteUser
}