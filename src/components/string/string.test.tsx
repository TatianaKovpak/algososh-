import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { reverseArr} from "./string";


const evenResult = [
    <Circle letter="4" state={ElementStates.Modified} key='3'/>,
    <Circle letter="3" state={ElementStates.Modified} key='2'/>,
    <Circle letter="2" state={ElementStates.Modified} key='1'/>,
    <Circle letter="1" state={ElementStates.Modified} key='0'/>,
]

const oddResult = [
    <Circle letter="3" state={ElementStates.Modified} key='2'/>,
    <Circle letter="2" state={ElementStates.Modified} key='1'/>,
    <Circle letter="1" state={ElementStates.Modified} key='0'/>,
]

const resultWithOneSymbol = [
    <Circle letter="1" state={ElementStates.Modified} key='0'/>,
]

describe('Тест разворота строки', () => {
    test('строка с четным кол-вом символов', async() => {
        await reverseArr('1234').then(res => {

            expect(res).toEqual(evenResult)
        })
    })

    test('строка с нечетным кол-вом символов', async() => {
        await reverseArr('123').then(res => {
            expect(res).toEqual(oddResult)
        })
    })

    test('строка с одним символом', async() => {
        await reverseArr('1').then(res => {
            expect(res).toEqual(resultWithOneSymbol)
        })
    })

    test('пустая строка', async() => {
        await reverseArr('').then(res => {
            expect(res).toEqual([])
        })
    })
})