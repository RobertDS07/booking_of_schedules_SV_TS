import jwt from 'jsonwebtoken'
import { FlaFlu } from '../../models/products/FlaFlu'
import { PingPong } from '../../models/products/PingPong'

export interface IMarkHour {
    produto:string
    horario: string
    token: string
    dia: string
}

export const markHourController = async ({produto, horario, token, dia}: IMarkHour) => {
    const user:any = jwt.verify(token, process.env.SECRET || 'hjasdhf873fb312', (err, decoded) => {
        if (err) return false

        return decoded
    })

    if (!user) return new Error('Houve algo errado... Tente fazer login novamente.')

    let product = FlaFlu

    if(produto === 'PingPong') product = PingPong

    await product.findOneAndUpdate({dia, quemQuando: {'$elemMatch' : {'hora': horario}}}, {'quemQuando.$.disponivel':false, 'quemQuando.$.whatsapp':  user.user.whatsapp}, {new:true})

    return 'Succes: Horário marcado com sucesso, qualquer dúvida contatar no whatsapp.'
}