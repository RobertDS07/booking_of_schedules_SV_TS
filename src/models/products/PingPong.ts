import mongoose from 'mongoose'

import { quemQuando } from './quemQuando'

const Schema = new mongoose.Schema({
    dia: {
        type: String,
        required: true
    },
    quemQuando: {
        type: [quemQuando],
        default: [{
            hora: '13:00',
            disponivel: true,
        },
        {
            hora: '13:30',
            disponivel: true,
        },
        {
            hora: '14:00',
            disponivel: true,
        },
        {
            hora: '14:30',
            disponivel: true,
        },
        {
            hora: '15:00',
            disponivel: true,
        },
        {
            hora: '15:30',
            disponivel: true,
        },
        {
            hora: '16:00',
            disponivel: true,
        },
        {
            hora: '16:30',
            disponivel: true,
        },
        {
            hora: '17:00',
            disponivel: true,
        },
        {
            hora: '17:30',
            disponivel: true,
        },
        {
            hora: '18:00',
            disponivel: true,
        }
        ],
    }
})

export const FlaFlu = mongoose.model('FlaFlu', Schema)