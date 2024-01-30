import React from "react";
import stringStyles from './stringStyles.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export async function swap(arr: JSX.Element[], i: number, j: number, setState?: React.Dispatch<React.SetStateAction<JSX.Element[]>>) {
  const temp = React.cloneElement(arr[i], {state : ElementStates.Changing});
  arr[i] = React.cloneElement(arr[j], {state : ElementStates.Changing});
  arr[j] = temp;
  setState && setState([...arr])
  await delay(DELAY_IN_MS)
  arr[j] = React.cloneElement(arr[j], {state : ElementStates.Modified});
  arr[i] = React.cloneElement(arr[i], {state : ElementStates.Modified})
  setState && setState([...arr])
}

export async function reverseArr (value: string, setIsReversing?:React.Dispatch<React.SetStateAction<boolean>>, setValue?: React.Dispatch<React.SetStateAction<string>>, setArr?: React.Dispatch<React.SetStateAction<JSX.Element[]>>) {
  const arr = value.split('')
  const newArr = arr.map((i, index) => { 
     return <Circle  letter={i} state={ElementStates.Default} key={index}/>
    })
  setIsReversing && setIsReversing(true)
  setValue && setValue('')
  setArr && setArr(newArr)
  await delay(DELAY_IN_MS)


  let tail = newArr.length - 1

  for(let i = 0; i < newArr.length / 2; i++) {
    
    swap(newArr, i, tail, setArr)
    await delay(DELAY_IN_MS)
    tail--
  }
  setIsReversing && setIsReversing(false)

  return newArr
  }



export const StringComponent: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [arr, setArr] = React.useState<JSX.Element[]>([])
  const [isReversing, setIsReversing] = React.useState(false)
  

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  // async function reverseArr () {
  //   const arr = value.split('')
  //   const newArr = arr.map((i, index) => { 
  //      return <Circle letter={i} state={ElementStates.Default} key={index}/>
  //     })
  
  //   setIsReversing(true)
  //   setValue('')
  //   setArr(newArr)
  //   await delay(DELAY_IN_MS)
  
  
  //   let tail = newArr.length - 1
  
  //   for(let i = 0; i < newArr.length / 2; i++) {
      
  //     swap(newArr, i, tail, setArr)
  //     await delay(DELAY_IN_MS)
  //     tail--
  //   }
  //   setIsReversing(false)
  //   }

  return (
    <SolutionLayout title="Строка" >
      <div className={stringStyles.string__page}>
        <div className={stringStyles.input__container}>
          <Input placeholder='Введите текст' isLimitText = {true} maxLength={11} type="text" onChange={onChange} value={value} />
          <Button type='button' extraClass={stringStyles.button} text='Развернуть' disabled={value ? false : true} isLoader={isReversing ? true : false}  onClick={() => reverseArr(value, setIsReversing, setValue, setArr)}/>
        </div>
        <div cy-id='circle_container' className={stringStyles.circle__container}>
        {arr}
        </div>
      </div>
     
     
    </SolutionLayout>
  );
}
