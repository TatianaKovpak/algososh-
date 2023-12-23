import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listPageStyles from './listPageStyles.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./listPage";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

interface ILinkedList {
  state: ElementStates,
  value: string,
  head: string | JSX.Element,
  tail: string | JSX.Element,
  index? : number
}


export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [indexValue, setIndexValue] = React.useState('')
  const [linkedList, setLinkedList] = React.useState(new LinkedList<ILinkedList>(randomArr()))
  const [linkedListToRender, setLinkedListToRender] = React.useState<JSX.Element[]>([])
  const [isRendering, setIsRendering] = React.useState(false)
  const changeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const changeIndexValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value)
  }

  function randomArr () : ILinkedList[] {
    const n = 0
    const m = 100
    const count = Math.floor(Math.random() * (7 - 3 + 1) + 3)
    let array:number[] = []
    let min = Math.min(n, m); 
    let max = Math.max(n, m); 

    for(let i = 0; i < count; i++) { 
      let randomNumber = Math.floor(Math.random() * (max - min + 1) + min); 
      array.push(randomNumber); 
    } 

    const newRandomArr = array.map(i => ({
      value: String(i),
      state: ElementStates.Default,
      head: '',
      tail: '',
    }))
     return newRandomArr
  }

  const renderLinkedList = () => {
    const arr = linkedList.getArray()
    const items = arr.map((i, index) => {
      return (
        <div className={listPageStyles.circle}  key={index}>
        <Circle
          letter={i.value}
          head={!i.head ? (index === 0 ? 'head' : i.head) : i.head}
          tail={!i.tail ? (index === arr.length - 1 ? 'tail' : i.tail) : i.tail}
          state={i.state}
          index={index}
          key={index}
        />
        {index != arr.length - 1 && <ArrowIcon key={index + 10}/>}
        </div>
      )
    })
    setLinkedListToRender(items)
  }

 React.useEffect(() => {
  renderLinkedList()

 },[])


 async function addItemToHead () {
  setIsRendering(true)

  if(linkedList.getArray()[0]){
    linkedList.getArray()[0].head = <Circle isSmall letter={value} state={ElementStates.Changing}/>
  }
  setLinkedList(linkedList)
  renderLinkedList()
  await delay(SHORT_DELAY_IN_MS)
  linkedList.getArray()[0].head = ''
  linkedList.prepend({
    value: value,
    state: ElementStates.Modified,
    head: 'head',
    tail: '',
  })
  setValue('')
  setLinkedList(linkedList)
  renderLinkedList()
  

  linkedList.getArray()[0].state = ElementStates.Default
  setLinkedList(linkedList)
  await delay(SHORT_DELAY_IN_MS)
  renderLinkedList()

  setIsRendering(false)

 }

 async function addItemToTail () {
  setIsRendering(true)
  const tail = linkedList.getSize() - 1
  if(linkedList.getArray()[tail] ) {
    linkedList.getArray()[tail].head = <Circle isSmall letter={value} state={ElementStates.Changing}/>
  }
  setLinkedList(linkedList)
  renderLinkedList()
  await delay(SHORT_DELAY_IN_MS)
  linkedList.getArray()[tail].head = ''
  linkedList.getArray()[tail].tail = ''
  renderLinkedList()
  
  linkedList.append({
    value: value,
    state: ElementStates.Modified,
    head: '',
    tail: 'tail'


  })
  setValue('')
  setLinkedList(linkedList)
  renderLinkedList()

  linkedList.getArray()[tail + 1].state = ElementStates.Default
  setLinkedList(linkedList)
  await delay(SHORT_DELAY_IN_MS)
  renderLinkedList()

  setIsRendering(false)

 }

 async function deleteHead () {
  setIsRendering(true)

  linkedList.getArray()[0].tail = <Circle isSmall letter={linkedList.getArray()[0].value} state={ElementStates.Changing}/>
  linkedList.getArray()[0].value = ''
  setLinkedList(linkedList)
  renderLinkedList()
  await delay(SHORT_DELAY_IN_MS)

  linkedList.deleteHead()
  setLinkedList(linkedList)
  renderLinkedList()

  setIsRendering(false)

}

async function deleteTail () {
  setIsRendering(true)

  const tail = linkedList.getSize() - 1
  linkedList.getArray()[tail].tail = <Circle isSmall letter={linkedList.getArray()[tail].value} state={ElementStates.Changing}/>
  linkedList.getArray()[tail].value = ''
  setLinkedList(linkedList)
  renderLinkedList()
  await delay(SHORT_DELAY_IN_MS)

  linkedList.deleteTail()
  setLinkedList(linkedList)
  renderLinkedList()

  setIsRendering(false)
}


async function addItemByIndex () {
  const index = Number(indexValue)

  if(index > linkedList.getSize() || index === linkedList.getSize() + 1 || index === linkedList.getSize()){
    addItemToTail()
    setIndexValue('')
    setValue('')
  } else {
    setIsRendering(true)
    linkedList.getArray()[index].head = <Circle isSmall letter={value} state={ElementStates.Changing} />
    linkedList.getArray()[index].state = ElementStates.Changing
    setLinkedList(linkedList)
    renderLinkedList()

    linkedList.getArray()[index].head = ''
    linkedList.getArray()[index].state = ElementStates.Default

    linkedList.insertAt({
      value: value,
      state: ElementStates.Modified,
      head : '',
      tail: '',
  
    }, index)
    setIndexValue('')
    setValue('')
    setLinkedList(linkedList)
    await delay(SHORT_DELAY_IN_MS)
    renderLinkedList()
  
    linkedList.getArray()[index].state = ElementStates.Default
    setLinkedList(linkedList)
    await delay(SHORT_DELAY_IN_MS)
    renderLinkedList()
    setIsRendering(false)
  }
}

async function deleteByIndex () {
  setIsRendering(true)
  const index = Number(indexValue)
  if(index === 0) {
    deleteHead()
    setIndexValue('')
  } else if(index === linkedList.getSize() - 1) {
    deleteTail()
    setIndexValue('')
  } else {
    linkedList.getArray()[index].tail = <Circle isSmall letter={linkedList.getArray()[0].value} state={ElementStates.Changing}/>
    setLinkedList(linkedList)
    renderLinkedList()
    setIndexValue('')
    await delay(SHORT_DELAY_IN_MS)

    linkedList.getArray()[index].tail = ''
    linkedList.getArray()[index].state = ElementStates.Default

    linkedList.removeAt(index)
    
    setLinkedList(linkedList)
    renderLinkedList()

  }

setIsRendering(false)
}



  return (
    <SolutionLayout title="Связный список">
      <div className={listPageStyles.form}>
        <Input extraClass={listPageStyles.input} placeholder="Введите значение" isLimitText={true} maxLength={4} type="text" onChange={changeValue} value={value}/>
        <Button extraClass={listPageStyles.button} disabled={(linkedListToRender.length >= 8 || value === '') ? true : false} type="button" text="Добавить в Head" onClick={addItemToHead} isLoader={isRendering === true ? true : false}/>
        <Button extraClass={listPageStyles.button} disabled={(linkedListToRender.length >= 8 || value === '') ? true : false} type="button" text="Добавить в Tail" onClick={addItemToTail} isLoader={isRendering === true ? true : false}/>
        <Button extraClass={listPageStyles.button} type="button" text="Удалить из Head" onClick={deleteHead} isLoader={isRendering === true ? true : false} disabled={linkedListToRender.length === 1 ? true : false}/>
        <Button extraClass={listPageStyles.button} type="button" text="Удалить из Tail" onClick={deleteTail} isLoader={isRendering === true ? true : false} disabled={linkedListToRender.length === 1 ? true : false}/>
        </div>
        <div className={listPageStyles.form__index}>
        <Input extraClass={listPageStyles.input}  placeholder="Введите индекс" isLimitText={true} max={7} onChange={changeIndexValue} value={indexValue} type='number'/>
        <Button extraClass={listPageStyles.button__index} disabled={(linkedListToRender.length >= 8 ? true : false) || (indexValue === '' || Number(indexValue) > 7 || value === '' ? true : false)} type="button" text="Добавить по индексу" isLoader={isRendering === true ? true : false} onClick={addItemByIndex}/>
        <Button extraClass={listPageStyles.button__index} disabled={(linkedListToRender.length === 1 || indexValue === '' || Number(indexValue ) >= linkedList.getSize() ) ? true : false} type="button" text="Удалить по индексу" isLoader={isRendering === true ? true : false} onClick={deleteByIndex} />
        </div>

      

      <div className={listPageStyles.circle__container}>
        {linkedListToRender}
      </div>

    </SolutionLayout>
  );
};
