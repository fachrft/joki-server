import Design from '../models/DesignModel.js';
import Users from '../models/UsersModel.js';
import {Op} from 'sequelize'

export const getDesign = async (req, res) => {
    try {
        let response;
        if(req.role === 'admin') {
            response = await Design.findAll({
                attributes:['uuid', 'nomor_hp', 'jenis_design', 'harga'],
                include: [{
                    model: Users,
                    attributes:['name', 'email',]
                }]
            })
        } else {
            response = await Design.findAll({
                attributes:['uuid', 'nomor_hp', 'jenis_design', 'harga'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email',]
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const getDesignById = async (req, res) => {
    try {
        const pesanan = await Design.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'pesanan not found'})

        let response;
        if(req.role === 'admin') {
            response = await Design.findOne({
                attributes:['uuid', 'nomor_hp', 'jenis_design', 'harga'],
                where: {
                    id: pesanan.id
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email',]

                }]
            })
        } else {
            response = await Design.findOne({
                attributes:['uuid', 'nomor_hp', 'jenis_design', 'harga'],
                where: {
                    [Op.and]:[{id: pesanan.id}, {userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email',]
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const createDesign = async (req, res) => {
    const {nomor_hp, jenis_design, harga} = req.body;
    try {
        await Design.create({
            nomor_hp: nomor_hp,
            jenis_design: jenis_design,
            harga: harga,
            userId: req.userId
        })
        res.status(201).json({msg: 'Pesanan berhasil di pesan'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const updateDesign = async (req, res) => {
    try {
        const pesanan = await Design.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})

        const {nomor_hp, jenis_design, harga} = req.body;
        if(req.role === 'admin') {
            await Design.update({nomor_hp, jenis_design, harga}, {
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await Design.update({nomor_hp, jenis_design, harga}, {
                where: {
                    [Op.and]:[{id: pesanan.id}, {userId: req.userId}]
                },
            })
        }
        res.status(200).json({msg: 'pesanan updated successfully'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const deleteDesign = async(req, res) => {
    try {
        const pesanan = await Design.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})
        if(req.role === 'admin') {
            await Design.destroy({
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await Design.destroy({
                where: {
                    [Op.and]:[{id: pesanan.id}, {userId: req.userId}]
                },
            })
        }
        res.status(200).json({msg: 'pesanan deleted successfully'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}