const User = require('../models/user.model')

const controller = {}

controller.index = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.json({ allUsers })
    } catch (err) {
        next(new Error(err))
    }
}

controller.getUserByID = async (req, res, next) => {
    try {
        console.log(req.params)
        const user = await User.findById(req.params.id)
        res.json({
            user
        })
    } catch (err) {
        next(new Error(err))
    }
}

controller.addUser = async (req, res, next) => {
    try {
        const { name, bags } = req.body
        const newUser = new User({ name, bags })
        await newUser.save()
        res.json({ status: 'User saved' })
    } catch (err) {
        next(new Error(err))
    }
}

controller.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, bags } = req.body
        await User.updateOne({ _id: id }, { name, bags })
        res.json({ status: 'User updated' })
    } catch (err) {
        next(new Error(err))
    }
}

controller.deleteUser = async (req, res, next) => {
    try {
        const userDelete = await User.findByIdAndDelete(req.params.id)
        res.json({ userDelete })
    } catch (err) {
        next(new Error(err))
    }
}

module.exports = controller