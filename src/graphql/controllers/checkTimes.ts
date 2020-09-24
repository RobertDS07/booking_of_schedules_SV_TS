import { IProdutos } from '../../models/products/FlaFlu'
import { FlaFlu } from '../../models/products/FlaFlu'
import { PingPong } from '../../models/products/PingPong'

export type TcheckTimes = Pick<IProdutos, 'produto' | 'dia'>

export const checkTimesController = async ({ produto, dia }: TcheckTimes) => {
    let product = FlaFlu

    if (produto === 'PingPong') product = PingPong

    const alredyDate = await product.findOne({ dia })

    if (!alredyDate) {
        const newDate = await product.create({ dia })

        const avaiableTimes: string[] = []

        newDate.quemQuando?.forEach(e => {
            avaiableTimes.push(e.hora)
        })

        return avaiableTimes
    }

    const avaiableTimes: string[] = []

    alredyDate.quemQuando?.forEach(e => {
        if(e.disponivel === true) avaiableTimes.push(e.hora)
    })

    return avaiableTimes
}