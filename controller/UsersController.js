import Users from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role'],
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}
export const getUsersById = async (req, res) => {
    const response = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'password'],
        where: {
            uuid : req.params.id
        }
    })
    try {
        if(!response) return res.status(404).json({msg: 'User not found' })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}
export const createUsers = async (req, res) => {
    const { name, email, password, confirmPassword, } = req.body;
    const role = req.body.role || 'user'
    if(password !== confirmPassword) return res.status(400).json({msg : 'Invalid password'})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name : name,
            email : email,
            password : hashPassword,
            role : role
        })
        if(email === Users.email) return res.status(400).json({msg : 'email already used'})
        res.status(201).json({msg: 'registration successfuly'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: 'User not found'})
    const { name, email,} = req.body;
    const role = req.body.role || 'user'
    let hashPassword;
    try {
        await Users.update({
            name: name,
            email: email,
            role: role
        }, {
            where: {
                id: user.id,
            }
        })
        res.status(200).json({msg: 'updated successfully'})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
export const deleteUsers = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: 'User not found' })
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: 'Updated successful'})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}