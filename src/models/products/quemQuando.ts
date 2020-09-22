import mongoose from 'mongoose'

export const quemQuando = new mongoose.Schema({
    hora: {
        type: String,
        required: true
    },
    disponivel: {
        type: Boolean,
        default: true
    },
    whatsapp: {
        type: Number
    },
}, {_id: false})
