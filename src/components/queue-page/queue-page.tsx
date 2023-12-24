import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import queueStyles from './queueStyles.module.css'
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

interface IQueue {
  state: ElementStates,
  value: string
}

export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [arr, setArr] = React.useState<JSX.Element[]>([])
  const [queue, setQueue] = React.useState(new Queue<IQueue>(6))
  const [isRendering, setIsRendering] = React.useState({isAdding: false, isRemoving: false, isClearing: false})

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  function renderArr () {
    const queueArr: any = queue.getArray()
    const arr:IQueue[] = []
    // console.log(arr)
    for (let i = 0; i < 6; i++) {
      if(queueArr[i]) {
        arr.push(queueArr[i]) 
      } else {
        arr.push({  value: '', state: ElementStates.Default})
      }
    }
    if(arr.length) {
      const item = arr.map((i, index) => {
      
        return (
          i && <Circle key = {index} letter={i.value} index={index} state={i.state} tail={queue.getTail() === (i.value && index + 1) ? 'tail' : ''} head={queue.getHead() ===  (i.value && index) ? 'head' : ''} />
      )
    })
  setArr(item)

    }
   
    
  }
  React.useEffect(() => {
    renderArr()

  },[])
  

  async function addItem () {
    queue.enqueue({ value, state: ElementStates.Changing})
    setIsRendering({isAdding: true, isClearing: false, isRemoving: false})
    setQueue(queue)
    setValue('')
    renderArr()
    await delay(SHORT_DELAY_IN_MS)
    const arr = queue.getArray()
    const tail = arr[queue.getTail() - 1] 
    if(tail != null) {
      tail.state = ElementStates.Default
    }
    // console.log(queue.getArray())
    setQueue(queue)
    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
   
  }

  async function removeItem () {
    const head = queue.peak()
    if(head) {
      head.state = ElementStates.Changing
    }
    setIsRendering({isAdding: false, isClearing: false, isRemoving: true})
    setQueue(queue)
    renderArr()
    await delay(SHORT_DELAY_IN_MS)

    queue.dequeue()
    setQueue(queue)
    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
    
  }

  async function clearItems () {
    const array = queue.getArray()
      array.forEach((item) => {
        if (item != null) {
          item.state = ElementStates.Changing
        }
      })

    
    setIsRendering({isAdding: false, isClearing: true, isRemoving: false})
    renderArr()
    await delay(SHORT_DELAY_IN_MS)
    queue.clear()
    console.log(queue.getArray())
    renderArr()
    setIsRendering({isAdding: false, isClearing: false, isRemoving: false})
    
  }
  
   const isItems = arr.filter(i => i.props.letter !== '' )
   const array = queue.getArray().filter(i => i !== null)
  

  return (
    <SolutionLayout title="Очередь">
      <div className={queueStyles.page}>
        <div className={queueStyles.input}>
          <Input placeholder='Введите текст' value={value} isLimitText = {true} maxLength={4} type="text" onChange={onChange}/>
          <Button text="Добавить" onClick={addItem} isLoader={isRendering.isAdding} disabled={((value === '' || ( array.length >=6 ) ) ? true : false) || isRendering.isRemoving || isRendering.isClearing} />
          <Button text="Удалить" onClick={removeItem} isLoader={isRendering.isRemoving} disabled={(isItems.length ? false : true) || isRendering.isAdding|| isRendering.isClearing} />
        </div>
        <Button text="Очистить" onClick={clearItems} isLoader={isRendering.isClearing} disabled={(isItems.length ? false : true) || isRendering.isRemoving || isRendering.isAdding}/>
      </div>
      <div className={queueStyles.circles}>
        { arr}
      </div>
    </SolutionLayout>
  );
};
