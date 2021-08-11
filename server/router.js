const express = require('express')
const router = express.Router()
const Rooms = require('./models/Rooms')
const History = require('./models/History')

router.get('/', async (req, res) => {
    res.send('Server is up and running on Heroku')
})

router.get('/rooms', async (req, res) => {
    const rooms = await Rooms.findAll()
    res.send({
        rooms
    })
})

router.get('/rooms/history/:id', async (req, res) => {
    const id = req.params.id
    const history = await History.findAll({
        where: {
            roomId: id
        }
    })
    res.send({
        history
    })
})

router.post('/rooms/history', async (req, res) => {
    try {
        const result = await History.create(req.body.history)
        res.send({
            status: 200,
            msg: 'Mensagem salva no histórico com sucesso',
            result
        })
    } catch (error) {
        res.send({
            status: 500,
            msg: 'Erro ao salvar mensagem',
            error
        })
    }
})

router.post('/rooms', async (req, res) => {
    try {
        const result = await Rooms.create(req.body.room)
        res.send({
            status: 200,
            msg: 'Sala criada com sucesso',
            result
        })
    } catch (error) {
        res.send({
            status: 500,
            msg: 'Erro ao criar sala.',
            error
        })
    }
})

router.delete('/rooms/:id', async (req, res) =>{
    try {
        const id = req.params.id
        const room = await Rooms.findByPk(id)
        room.destroy()
        res.send({
            status: 200,
            msg: 'Registro deletado.',
        })
    } catch (error) {
        res.send({
            status: 500,
            msg: 'Erro ao deletar sala.',
            error
        })
    }
})

router.patch('/rooms', async (req, res) =>{
    try {
        const { nome, id } = req.body.room
        const room = await Rooms.findByPk(id)
        room.nome = nome
        const result = await room.save()
        res.send({
            status: 200,
            msg: 'Sala atualizada com sucesso',
            result
        })
    } catch (error) {
        res.send({
            status: 500,
            msg: 'Erro ao atualizar sala.',
            error
        })
    }
})

module.exports = router