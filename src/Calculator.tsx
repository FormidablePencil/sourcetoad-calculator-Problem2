import { evaluate } from 'mathjs';
import { useEffect, useState } from 'react';

export const useCalculator = () => {
  const [arrOfValues, setArrOfValues] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState<string>("")
  const [operators, setOperators] = useState<any>({})
  const [toCalculate, setToCalculate] = useState<boolean>(false)
  const [calculatedResult, setCalculatedResult] = useState<string | null>(null)
  const [showCalculatedResult, setShowCalculatedResult] = useState<boolean>(false)

  useEffect(() => {
    if (toCalculate === true) {
      console.log(arrOfValues, "arrOfValues")
      const res = arrOfValues.reduce((first, second, idx) => {
        console.log(`${first} ${operators[idx]} ${second} what`)
        return evaluate(`${first} ${operators[idx - 1]} ${second}`)
      })
      setToCalculate(false)
      setShowCalculatedResult(true)
      setArrOfValues([])
      setOperators({})
      setCalculatedResult(res)
    }
  }, [toCalculate])

  function onClick(value: string) {
    let isNumber = !isNaN(parseInt(value))

    if (calculatedResult !== null) {
      setShowCalculatedResult(false)
      setCalculatedResult(null)
    }

    if (value === "=") setupCalculation()
    else if (isNumber) setCurrentValue(prev => prev ? `${prev}${value}` : value)
    else if (!isNumber) addOperator(value)
  }

  function addOperator(value: string) {
    //save operator, push currentValue to arrOfValues and reset currentValue
    setOperators((obj: any) => {
      return { ...obj, [arrOfValues.length]: value }
    })
    setArrOfValues((prev: string[]) => [...prev, currentValue])
    setCurrentValue("")
  }

  function setupCalculation() {
    if (arrOfValues !== undefined) {
      setArrOfValues((prev: string[]) => [...prev, "2"])
      setCurrentValue("")
      setToCalculate(true)
      // const res = arrOfValues.reduce((first, second, idx) => {
      //   console.log(`${first} ${operators[idx]} ${second} what`)
      //   return evaluate(`${first} ${operators[idx]} ${second}`)
      // })
    }
    // return operators[values.length]
  }

  return {
    onClick,
    showCalculatedResult: calculatedResult,
    arrOfValues, setArrOfValues,
    currentValue, setCurrentValue,
    operators, setOperators,
    calculate2: toCalculate, setCalculate2: setToCalculate
  }
}