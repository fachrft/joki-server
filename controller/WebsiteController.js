import Website from '../models/WebsiteModel.js';
import Users from '../models/UsersModel.js';
import {Op} from 'sequelize'

export const getWebsite =  async (req, res) => {
    try {
        let response;
        if(req.role === 'admin') {
            response = await Website.findAll({
                attributes:['uuid', 'nomor_hp', 'jenis_web', 'harga'],
                include: [{
                    model: Users,
                    attributes:['name', 'email',]

                }]
            })
        } else {
            response = await Website.findAll({
                attributes:['uuid', 'nomor_hp', 'jenis_web', 'harga'],
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
export const getWebsiteById = async (req, res) => {
    try {
        const pesanan = await Website.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'pesanan not found'})

        let response;
        if(req.role === 'admin') {
            response = await Website.findOne({
                attributes:['uuid', 'nomor_hp', 'jenis_web', 'harga'],
                where: {
                    id: pesanan.id
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email',]

                }]
            })
        } else {
            response = await Website.findOne({
                attributes:['uuid', 'nomor_hp', 'jenis_web', 'harga'],
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
export const createWebsite = async (req, res) => {
    const {nomor_hp, jenis_web, harga} = req.body;
    try {
        await Website.create({
            nomor_hp: nomor_hp,
            jenis_web: jenis_web,
            harga: harga,
            userId: req.userId
        })
        res.status(201).json({msg: 'Pesanan berhasil di pesan'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const updateWebsite = async (req, res) => {
    try {
        const pesanan = await Website.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})

        const {nomor_hp, jenis_web, harga} = req.body;
        if(req.role === 'admin') {
            await Website.update({nomor_hp, jenis_web, harga}, {
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await Website.update({nomor_hp, jenis_web, harga}, {
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
export const deleteWebsite = async (req, res) => {
    try {
        const pesanan = await Website.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})
        if(req.role === 'admin') {
            await Website.destroy({
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await Website.destroy({
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