import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import sortingPageStyles from './sortingPageStyles.module.css'
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";




export const SortingPage: React.FC = () => {
  
const [sortingArr, setArr] = React.useState<JSX.Element[]>([])
const [variableSort, setVariableSort] = React.useState('choice')
const [isRendering, setIsRendering] = React.useState({
  isNewArr : false,
  isDescending: false,
  isAscending: false
})

React.useEffect(() => {
  randomArr()
},[])


async function swap(arr: JSX.Element[], i: number, j: number) {
  const temp = React.cloneElement(arr[i], {state : ElementStates.Changing});
  arr[i] = React.cloneElement(arr[j], {state : ElementStates.Changing});
  arr[j] = temp;
  setArr([...arr])
  await delay(SHORT_DELAY_IN_MS)
  arr[j] = React.cloneElement(arr[j], {state : ElementStates.Default});
  arr[i] = React.cloneElement(arr[i], {state : ElementStates.Default})
  setArr([...arr])
}



function randomArr () : void {
  const n = 0
  const m = 100
  const count = Math.floor(Math.random() * (17 - 3 + 1) + 3)
  let array:number[] = []
  let min = Math.min(n, m); 
  let max = Math.max(n, m); 
  setIsRendering({...isRendering, isNewArr : true})

  for(let i = 0; i < count; i++) { 
 
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min); 
    array.push(randomNumber); 
  } 
   setArr(array.map((i, index) => <Column index={i} state={ElementStates.Default} key={index}/>)); 
   setIsRendering({...isRendering, isNewArr : false})
}


const bubbleSelected = () => {
  setVariableSort('bubble')
}

const choiceSelected = () => {
  setVariableSort('choice')
}

async function bubbleAscend() {
  setIsRendering({...isRendering, isAscending: true})
  const arr = [...sortingArr].slice()
  for (let i = 0; i < arr.length - 1; i++) {
    for ( let j = arr.length - 1; j > i; j--) {
      if(arr[j].props.index < arr[j - 1].props.index) {
          swap(arr, j, j - 1)
          await delay(SHORT_DELAY_IN_MS)
        }
      }
      arr[i] = React.cloneElement(arr[i], {state : ElementStates.Modified});
      setArr([...arr])
    }
    arr[arr.length - 1] = React.cloneElement(arr[arr.length - 1], {state : ElementStates.Modified});
    setArr([...arr])
    setIsRendering({...isRendering, isAscending: false})
}

async function bubbleDescen () {
  setIsRendering({...isRendering, isDescending: true})
  const arr = [...sortingArr].slice()
  for (let i = 0; i < arr.length - 1; i++) {
    for ( let j = arr.length - 1; j > i; j--) {
      if(arr[j].props.index > arr[j - 1].props.index) { 
        swap(arr, j, j - 1)
        await delay(SHORT_DELAY_IN_MS)
      }
    }
    arr[i] = React.cloneElement(arr[i], {state : ElementStates.Modified});
    setArr([...arr])
  }
  arr[arr.length - 1] = React.cloneElement(arr[arr.length - 1], {state : ElementStates.Modified});
  setArr([...arr])
  setIsRendering({...isRendering, isDescending: false})
}

async function choiseAscend () {
  setIsRendering({...isRendering, isAscending: true})
  const arr = [...sortingArr].slice()
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < arr.length; j++) {
          if(arr[minIndex].props.index > arr[j].props.index) {  
            minIndex = j
          }
      }
      if(minIndex !== i) {
        swap(arr, minIndex, i)
        await delay(SHORT_DELAY_IN_MS)
      }
      arr[i] = React.cloneElement(arr[i], {state : ElementStates.Modified});
      arr[minIndex] = React.cloneElement(arr[minIndex], {state : ElementStates.Modified});
    }
    setArr(arr)
    setIsRendering({...isRendering, isAscending: false})
}

async function choiseDescen () {
  setIsRendering({...isRendering, isDescending: true})
  const arr = [...sortingArr].slice()
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
        if(arr[minIndex].props.index < arr[j].props.index) {  
          minIndex = j
        }
    }
    if(minIndex !== i) {
      swap(arr, minIndex, i)
      await delay(SHORT_DELAY_IN_MS)
    }
    arr[i] = React.cloneElement(arr[i], {state : ElementStates.Modified});
    arr[minIndex] = React.cloneElement(arr[minIndex], {state : ElementStates.Modified});
  }
  setArr(arr)
  setIsRendering({...isRendering, isDescending: false})
}

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingPageStyles.page}>
      <div className={sortingPageStyles.box}>
        <RadioInput label="Выбор" extraClass={sortingPageStyles.radio} onChange={choiceSelected} checked={variableSort === 'choice'} />
        <RadioInput label="Пузырёк" extraClass={sortingPageStyles.radio} onChange={bubbleSelected} checked={variableSort === 'bubble'}/>
      </div>
      <div className={sortingPageStyles.box}>
        <Button text="По возрастанию" extraClass={sortingPageStyles.button} onClick={() => variableSort === 'bubble' ? bubbleAscend() : choiseAscend()} disabled={(!sortingArr.length ? true : false) || isRendering.isDescending || isRendering.isNewArr} name="ascending" isLoader={isRendering.isAscending ? true : false}/>
        <Button text="По убыванию" extraClass={sortingPageStyles.button} onClick={() => variableSort === 'bubble' ? bubbleDescen() :choiseDescen()} disabled={!sortingArr.length ? true : false || isRendering.isAscending || isRendering.isNewArr} name="descending" isLoader={isRendering.isDescending ? true : false}/>
      </div>
      <Button text="Новый массив" type="button" onClick={randomArr} isLoader={isRendering.isNewArr ? true : false} disabled={isRendering.isAscending || isRendering.isDescending}/>
      </div>
      <div className={sortingPageStyles.columns}>

      {sortingArr.map((item) => {
        return item
      })}
       </div>

    </SolutionLayout>
  );
};

