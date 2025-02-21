const User = require('../model/user.model')

const handleUser = async (req, res) => {
    try {
        const user = await User.find()
        if(user.length) {
            res.status(200).json({
                success: true,
                message: "All User Found",
                data : user
            })
        } else {
            res.status(404).json({
                success: false,
                message: "No User Found",
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error.message
        })
    }
}

const handleCreateUser = async (req, res) => {
    try {
        const newUser = await new User(req.body).save()
        if(newUser) {
            res.status(201).json({
                success: true,
                message: "One user is created",
                data: newUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User is not created",
            })
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists. Please use a different email." });
        }
        res.status(500).json({ error: error.message });
    }
}

const handleUpdateUser = async (req, res) => {
    try {
        const newData = req.body
        const findAndUpdate = await User.findByIdAndUpdate(req.params.id, newData, {new : true})
        if(findAndUpdate) {
            res.status(200).json({
                success: true,
                message: "One user is updated",
                data: findAndUpdate
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User is not updated",
            })
        }
    } catch (error) {
         res.status(500).json({
            success: false,
            err: error.message
        })
    }
}

const handleUserDelete = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(deleteUser) {
            res.status(200).json({
                success: true,
                message: "One user is deleted",
                data: deleteUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User is not deleted",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error.message
        })
    }
}

module.exports = {
    handleUser,
    handleCreateUser,
    handleUpdateUser,
    handleUserDelete
}