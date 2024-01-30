import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { bubbleAscend, bubbleDescen, choiseAscend, choiseDescen } from "./sorting-page";

const array = [
<Column index= {2} state={ElementStates.Default} />,
<Column index= {1} state={ElementStates.Default} />,
<Column index= {3} state={ElementStates.Default} />,
]



const ascendingResult = [
    <Column index= {1} state={ElementStates.Modified} />,
    <Column index= {2} state={ElementStates.Modified} />,
    <Column index= {3} state={ElementStates.Modified} />,
]

const descendingResult = [
    <Column index= {3} state={ElementStates.Modified}/>,
    <Column index= {2} state={ElementStates.Modified} />,
    <Column index= {1} state={ElementStates.Modified} />,
]

describe('Тест алгоритмов сортировки пузырьком и выбором', () => {
    test('Сортировка массива выбором нескольких элементов по возрастанию', async() => {
        await choiseAscend(array).then(res => {
            expect(res).toEqual(ascendingResult)
        })
    })

    test('Сортировка массива выбором нескольких элементов по убыванию', async() => {
        await choiseDescen(array).then(res => {
            expect(res).toEqual(descendingResult)
        })
    })

    test ('Сортировка массива выбором массива с одним элементом по возрастанию', async() => {
        await choiseAscend([<Column index= {1} state={ElementStates.Modified} />]).then(res => {
            expect(res).toEqual([<Column index= {1} state={ElementStates.Modified} />])
        })
    })

    test ('Сортировка массива выбором массива с одним элементом по убыванию', async() => {
        await choiseDescen([<Column index= {1} state={ElementStates.Modified} />]).then(res => {
            expect(res).toEqual([<Column index= {1} state={ElementStates.Modified} />])
        })
    })

    test ('Сортировка пустого массива выбором по возрастанию', async() => {
        await choiseAscend([]).then(res => {
            expect(res).toEqual([])
        })
    })

    test ('Сортировка пустого массива выбором по убыванию', async() => {
        await choiseDescen([]).then(res => {
            expect(res).toEqual([])
        })
    })

    test('Сортировка массива из нескольких элементов пузырьком по возрастанию', async() => {
        await bubbleAscend(array).then(res => {
            expect(res).toEqual(ascendingResult)
        })
    })

    test('Сортировка массива из нескольких элементов пузырьком по убыванию', async() => {
        await bubbleDescen(array).then(res => {
            expect(res).toEqual(descendingResult)
        })
    })

    test ('Сортировка пузырьком массива с одним элементом по возрастанию', async() => {
        await bubbleAscend([<Column index= {1} state={ElementStates.Modified} />]).then(res => {
            expect(res).toEqual([<Column index= {1} state={ElementStates.Modified} />])
        })
    })

    test ('Сортировка пузырьком массива с одним элементом по убыванию', async() => {
        await bubbleDescen([<Column index= {1} state={ElementStates.Modified} />]).then(res => {
            expect(res).toEqual([<Column index= {1} state={ElementStates.Modified} />])
        })
    })

    test ('Сортировка пустого массива пузырьком по возрастанию', async() => {
        await bubbleAscend([]).then(res => {
            expect(res).toEqual([])
        })
    })

    test ('Сортировка пустого массива пузырьком по убыванию', async() => {
        await bubbleDescen([]).then(res => {
            expect(res).toEqual([])
        })
    })




})


