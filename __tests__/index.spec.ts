import mongoose from 'mongoose'

import {resolvers} from '../src/graphql/index'
import {User} from '../src/models/User'
import {FlaFlu} from '../src/models/products/FlaFlu'
import {PingPong} from '../src/models/products/PingPong'

beforeAll(async () => {
    await mongoose.connect(process.env.DB || 'mongodb://localhost:27017/testTs', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => console.log('db connected'))
})

describe('login/register', () => {
    it('deve retornar um erro caso a senha tenha menos de 5 caracteres', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "1234" })).toStrictEqual(Error('Senha deve conter 5 caracteres ou mais'))
    })
    it('deve retornar um token caso o cadastro seja um sucesso', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "123456" })).toStrictEqual(('123456'))
    })
    it('deve retornar um erro caso o whatsapp já esteja sendo utilizado', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 12, whatsapp: 984712615, senha: "123456" })).toStrictEqual(Error('Whatsapp já cadastrado'))
    })
    it('deve retornar um erro caso o o número da casa exceda o máximo de 625', async() => {
        expect(await resolvers.register({ nome: "Robert", casa: 626, whatsapp: 9184712615, senha: "123456" })).toStrictEqual(Error('Casa inválida...'))
    })
    it('deve retornar um token caso o login seja um sucesso', async() => {
        expect(await resolvers.login({ whatsapp: 984712615, senha: "123456" })).toStrictEqual(('123456'))
    })
    it('deve retornar um erro caso o login falhe', async() => {
        expect(await resolvers.login({ whatsapp: 984712615, senha: "1234567" })).toStrictEqual(Error('Credenciais invalidas'))
    })
})

describe('regras de negocio', () => {
    it('deve receber um produto e um dia que ainda não tenha sido marcado para o programa criar todos horarios certinhos. E dps retornar todos horarios de volta pois não há nenhum agendado ainda.', async() => {
        const horarios = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        expect( await resolvers.checkTimes({ produto: "FlaFlu", dia: '16/09/2020' })).toStrictEqual(horarios)
    })
    it('Deve receber um horario especifico, um token para pegar as infos do usuario, um produto e retornar uma msg de sucesso para o usuario', async () => {
        expect( await resolvers.markHour({ produto: "FlaFlu", horario: '13:00', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNjhjNDEzMzA4ZWYwMjA1NGE1MGI2ZCIsIm5vbWUiOiJSb2JlcnQiLCJjYXNhIjoxMiwid2hhdHNhcHAiOjk4NDcxMjYxNSwiX192IjowfSwiaWF0IjoxNjAwNzAxNDU5LCJleHAiOjE2MzIyMzc0NTl9.j7293AZjjXfVIjX7zFvVolP_G64yJvsipLBP5HySeMg', dia: "16/09/2020" })).toStrictEqual('Succes: Horário marcado com sucesso, qualquer dúvida contatar no whatsapp.')
    })
    it('Deve retornar um erro, pois o token esta errado', async () => {
        expect( await resolvers.markHour({ produto: "FlaFlu", horario: '13:00', token: 'eyJMGI2ZCIsIm5vbaWF06LBP5HySeMg', dia: "16/09/2020" })).toStrictEqual(Error('Houve algo errado... Tente fazer login novamente.'))
    })
    it('Deve receber um array de horarios e retornar apenas os disponiveis', async () => {
        const horariosRes = ['13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
        expect( await resolvers.checkTimes({ produto: "FlaFlu", dia: '16/09/2020' })).toStrictEqual(horariosRes)
    })
})

afterAll(async () => {
    await User.deleteMany({})
    await PingPong.deleteMany({})
    await FlaFlu.deleteMany({})
    await mongoose.disconnect()
})