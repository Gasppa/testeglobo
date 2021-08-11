const request = require('supertest')
const app = require('../config/app')

describe('API endpoints unit test', ()=>{
  it('should return an array of rooms on GET /rooms', async () => {
    const res = await request(app).get('/rooms')
    expect(res.body).toHaveProperty('rooms')
    expect(Array.isArray(res.body.rooms)).toBe(true)
  })

  it('should return the history for the specified room', async () => {
    const res = await request(app).get('/rooms/history/2')
    expect(res.body).toHaveProperty('history')
    expect(Array.isArray(res.body.history)).toBe(true)
  })

  it('should create a message history for the specified room', async () => {
    const res = await request(app).post('/rooms/history').send({ history: { text: "Sample Message From Jest", user: "TestUnit", roomId: "2"} })
    expect(res.body.status).toEqual(200)
  })

  it('should return error when trying to save a message history for an unexisting room', async () => {
    const res = await request(app).post('/rooms/history').send({ history: { text: "Sample Message From Jest", user: "TestUnit", roomId: "999"} })
    expect(res.body.status).toEqual(500)
  })

  it('should create a room', async () => {
    const res = await request(app).post('/rooms').send({ room: { nome: "Sample Room From Jest"} })
    expect(res.body.status).toEqual(200)
  })

  it('should return error when trying to create a room with no name', async () => {
    const res = await request(app).post('/rooms').send({room: {} })
    expect(res.body.status).toEqual(500)
  })

  it('should delete the specified room', async () => {
    const getRoomsResult = await request(app).get('/rooms')
    const [lastRoom] = getRoomsResult.body.rooms.slice(-1)
    const res = await request(app).delete(`/rooms/${lastRoom.id}`)
    expect(res.body.status).toEqual(200)
  })

  it('should return error when trying to delete an unexisting room', async () => {
    const res = await request(app).delete(`/rooms/999`)
    expect(res.body.status).toEqual(500)
  })

  it('should update a rooms name', async () => {
    const getRoomsResult = await request(app).get('/rooms')
    const [lastRoom] = getRoomsResult.body.rooms.slice(-1)
    const res = await request(app).patch('/rooms').send({ room: { nome: "Sample Room From Jest - Updated Name", id: lastRoom.id } })
    expect(res.body.status).toEqual(200)
  })

  it('should return error when trying to update an unexisting rooms name', async () => {
    const res = await request(app).patch('/rooms').send({ room: { nome: "Sample Room From Jest - Updated Name", id: '999'} })
    expect(res.body.status).toEqual(500)
  })
})