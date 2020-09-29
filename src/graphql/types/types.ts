import { IProdutos } from '../../models/products/FlaFlu'

export type Tlogin = Pick<Iregister, 'senha' | 'whatsapp'>
export type TcheckTimes = Pick<IProdutos, 'produto' | 'dia'>
export interface forgetPassword {
    email: string
    key: string
}
export interface changePassword {
    email: string
    password: string
}

export interface Iregister {
    nome: string
    whatsapp: number
    senha: string
    casa: number
    email: string
}
export interface IMarkHour {
    produto: string
    horario: string
    token: string
    dia: string
}
