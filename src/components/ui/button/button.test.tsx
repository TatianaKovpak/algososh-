import { Button } from "./button";
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react';


describe('Тестирование кнопки', () => {
    it('С текстом', () => {
        const button = renderer.create(<Button text = 'Текст' type='button'/>).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('Без текста', () => {
        const button = renderer.create(<Button type='button'/>).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('Неактивная кнопка', () => {
        const button = renderer.create(<Button type='button' disabled={true}/>).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('С лоадером', () => {
        const button = renderer.create(<Button type="button" isLoader={true}/>).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('Вызов колбэка при клике', () => {
      const onClickMock = jest.fn()
 
      const { getByText } = render(<Button onClick={onClickMock} type='button' text='Текст' />);
      const button = getByText('Текст');
      fireEvent.click(button);

      expect(onClickMock).toHaveBeenCalled();
    })
})
