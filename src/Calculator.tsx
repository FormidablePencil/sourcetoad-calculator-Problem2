import { evaluate } from 'mathjs';
import { useEffect, useState } from 'react';

export const useCalculator = () => {
  const [arrOfValues, setArrOfValues] = useState<string[]>([])
  const [currentValue, setCurrentValue] = useState<string>("")
  const [operators, setOperators] = useState<any>({})
  const [toCalculate, setToCalculate] = useState<boolean>(false)
  const [calculatedResult, setCalculatedResult] = useState<string | null>(null)

  useEffect(() => {
    // preform calculation and cleanup
    if (toCalculate === true) {
      const concatDataForCalc = arrOfValues.reduce((first, second, idx) => `${first} ${operators[idx - 1]} ${second}`)

      // reset everything
      setToCalculate(false)
      setArrOfValues([])
      setOperators({})

      console.log(concatDataForCalc)
      setCalculatedResult(evaluate(concatDataForCalc))
    }
  }, [toCalculate])

  function onClickAnyBtn(value: string) {
    let isAnOperator = isNaN(parseInt(value))

    // when pressing another value clear calculated output
    if (calculatedResult !== null) setCalculatedResult(null)

    if (value === "=") queueCalculation()
    else if (!isAnOperator || value === "." || value === "(" || value === ")")
      setCurrentValue(prev => prev ? `${prev}${value}` : value)
    else if (isAnOperator) addOperator(value)
  }

  function addOperator(value: string) {
    //save operator, push currentValue to arrOfValues and reset currentValue
    setOperators((obj: any) => ({ ...obj, [arrOfValues.length]: value }))
    setArrOfValues((prev: string[]) => [...prev, currentValue])
    setCurrentValue("")
  }

  function queueCalculation() {
    if (arrOfValues !== undefined) {
      setArrOfValues((prev: string[]) => [...prev, currentValue])
      setCurrentValue("")
      setToCalculate(true)
    }
  }

  return {
    onClickAnyBtn,
    calculatedResult,
    arrOfValues, setArrOfValues,
    currentValue, setCurrentValue,
    operators, setOperators,
    calculate2: toCalculate, setCalculate2: setToCalculate
  }
}