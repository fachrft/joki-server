import PPT from '../models/PPTModel.js';
import Users from '../models/UsersModel.js';
import {Op} from 'sequelize'

export const getPPT = async (req, res) => {
    try {
        let response;
        if(req.role === 'admin') {
            response = await PPT.findAll({
                attributes:['uuid', 'nomor_hp', 'pelajaran_ppt', 'materi_ppt', 'harga'],
                include: [{
                    model: Users,
                    attributes:['name', 'email',]

                }]
            })
        } else {
            response = await PPT.findAll({
                attributes:['uuid', 'nomor_hp', 'pelajaran_ppt', 'materi_ppt', 'harga'],
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
export const getPPTById = async (req, res) => {
    try {
        const pesanan = await PPT.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'pesanan not found'})

        let response;
        if(req.role === 'admin') {
            response = await PPT.findOne({
                attributes:['uuid', 'nomor_hp', 'pelajaran_ppt', 'materi_ppt', 'harga'],
                where: {
                    id: pesanan.id
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email',]

                }]
            })
        } else {
            response = await PPT.findOne({
                attributes:['uuid', 'nomor_hp', 'pelajaran_ppt', 'materi_ppt', 'harga'],
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
export const createPPT = async (req, res) => {
    const {nomor_hp, pelajaran_ppt, materi_ppt, harga} = req.body;
    try {
        await PPT.create({
            nomor_hp: nomor_hp,
            pelajaran_ppt: pelajaran_ppt,
            materi_ppt: materi_ppt,
            harga: harga,
            userId: req.userId
        })
        res.status(201).json({msg: 'Pesanan berhasil di pesan'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export const updatePPT = async (req, res) => {
    try {
        const pesanan = await PPT.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})

        const {nomor_hp, pelajaran_ppt, materi_ppt, harga} = req.body;
        if(req.role === 'admin') {
            await PPT.update({nomor_hp, pelajaran_ppt, materi_ppt, harga}, {
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await PPT.update({nomor_hp, pelajaran_ppt, materi_ppt, harga}, {
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
export const deletePPT = async (req, res) => {
    try {
        const pesanan = await PPT.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!pesanan) res.status(404).json({msg: 'data tidak ditemukan'})
        if(req.role === 'admin') {
            await PPT.destroy({
                where: {
                    id: pesanan.id
                }
            })
        } else {
            if(req.userId !== pesanan.userId) return res.status(403).json({msg : 'akses terlarang'})
            await PPT.destroy({
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