import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacciStyles from './fibonacciStyles.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";




export const FibonacciPage: React.FC = () => {
  const [value, setValue] = React.useState('')
  const [arr, setArr] = React.useState<number[]>([])
  const [isRendering, setIsRendering] = React.useState(false)
 

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const number = Number(value)

  const fibonacci = (n: number) => {
    const arr = [1, 1];
	for (let i = 2; i <= n; i++) {
		arr.push(arr[i-1] + arr[i-2]);
	}
	return arr;
  };

  async function onClick () {

    const newArr : number[] = fibonacci(number)
    setValue('')
    for(let i = 0; i < newArr.length; i++) {
      setIsRendering(true)
      setArr(newArr.slice(0, i + 1))
      await delay(SHORT_DELAY_IN_MS)
    }
    setIsRendering(false)
  }



  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={fibonacciStyles.fibonacci__page}>
        <div className={fibonacciStyles.input__container}>
          <Input placeholder='Введите текст' value={value} isLimitText = {true} max={19} type="number" onChange={onChange}  />
          <Button extraClass={fibonacciStyles.button} isLoader={isRendering ? true : false} disabled={(number >=1 && number <= 19) ? false : true} text='Рассчитать' type="button" onClick={onClick}/>
        </div>
        <div className={fibonacciStyles.circle__container}>
        {arr.map ((i, index) => {
          const str = String(i)
          return (
            <Circle key={index} letter={str} index={index} />
          )
        })}
     
        </div>
      </div>
     
    </SolutionLayout>
  );
};



