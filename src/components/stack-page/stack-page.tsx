import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stackStyles from './stackStyles.module.css'
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

interface IStack {
  state: ElementStates ,
  value: string
}

export const StackPage: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [stack, setStack] = React.useState(new Stack<IStack>())
  const [arrToRender, setArrToRender] = React.useState<JSX.Element[]>([])
  const [isRendering, setIsRendering] = React.useState({isAdding: false, isRemoving: false, isClearing: false})
 

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  function renderArr () {
    const arr = stack.getArray()
      const item = arr.map((i, index) => {
        return (
          <Circle key = {index} head={index === stack.getSize() - 1 ? 'top' : ''} letter={i.value} index={index} state={i.state}/>
      )
    })
  setArrToRender(item)

  }

  async function addItem () {
    stack.push({value, state: ElementStates.Changing})
    setStack(stack)
    setValue('')
    setIsRendering({isAdding: true, isClearing: false, isRemoving: false})
    renderArr()

    await delay(SHORT_DELAY_IN_MS)

    let peak = stack.peak()
    console.log(peak)

    if(peak) {
      peak.state = ElementStates.Default
    }

    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
  }

  async function removeItem () {
    let peak = stack.peak()
    if(peak) {
      peak.state = ElementStates.Changing
    }
    setIsRendering({isAdding: false, isClearing: false, isRemoving: true})
    renderArr()
    await delay(SHORT_DELAY_IN_MS)
    stack.pop()
    setStack(stack)
    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
  }

  async function clearItems () {
    const array = stack.getArray()
    array.forEach((item) => {
      item.state = ElementStates.Changing
    })
    setIsRendering({isAdding: false, isClearing: true, isRemoving: false})
    renderArr()
    await delay(SHORT_DELAY_IN_MS)
    stack.clear()
    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
    console.log(array)
  }



  return (
    <SolutionLayout title="Стек">
      <div className={stackStyles.page}>
        <div className={stackStyles.input}>
          <Input placeholder='Введите текст' value={value} isLimitText = {true} maxLength={4} type="text" onChange={onChange}/>
          <Button text="Добавить" isLoader={isRendering.isAdding} onClick={addItem} disabled={!value ? true : false}/>
          <Button text="Удалить" isLoader={isRendering.isRemoving} onClick={removeItem} disabled={!arrToRender.length ? true : false}/>
        </div>
        <Button text="Очистить" isLoader={isRendering.isClearing} onClick={clearItems} disabled={!arrToRender.length ? true : false}/>
      </div>
      <div className={stackStyles.circles}>
        {arrToRender}
      </div>

    </SolutionLayout>
  );
};
