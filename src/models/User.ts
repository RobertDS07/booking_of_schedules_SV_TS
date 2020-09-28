import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    casa: {
        type: Number,
        required: true
    },
    whatsapp: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    key: {
        type: String
    }
})

export interface user extends mongoose.Document {
    nome: string
    casa: number
    whatsapp: number
    senha: string
    email: string
    key?: string
}

Schema.pre<user>('save', async function () {
    this.senha = await bcrypt.hash(this.senha, 10)
})

export const User = mongoose.model<user>('users', Schema) 