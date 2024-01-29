import { Circle } from "./circle";
import renderer from 'react-test-renderer'
import { ElementStates } from "../../../types/element-states";

describe('Тестирование Circle', () => {
    it('Без текста', () => {
        const circle = renderer.create(<Circle/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('С текстом', () => {
        const circle = renderer.create(<Circle letter="текст"/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with head', () => {
        const circle = renderer.create(<Circle head='head'/>)
        expect(circle).toMatchSnapshot()
    })

    it('circle with text in head', () => {
        const text = <Circle letter="text" isSmall={true}/>
        const circle = renderer.create(<Circle tail={text}/>).toJSON()
        expect(circle).toMatchSnapshot()

    })

    it('circle with tail', () => {
        const circle = renderer.create(<Circle tail='tail'/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with text in tail', () => {
        const text = <Circle letter="text" isSmall={true}/>
        const circle = renderer.create(<Circle tail={text}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with index', () => {
        const circle = renderer.create(<Circle index={1}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle is small', () => {
        const circle = renderer.create(<Circle isSmall={true}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle default', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle modified', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle changing', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON()
        expect(circle).toMatchSnapshot()
    })
})