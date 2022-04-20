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

      setCalculatedResult(evaluate(concatDataForCalc))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCalculate])

  function onClickAnyBtn(value: string) {
    let isAnOperator = isNaN(parseInt(value))

    // when pressing another value clear calculated output
    if (calculatedResult !== null) setCalculatedResult(null)

    if (value === "=") queueCalculation()
    else if (!isAnOperator || value === "." || value === "(" || value === ")") {
      // disallow entering ')' if there is no '('
      if (value === ")") if (disallowNonClosingParenthesesFirst(value)) return
      setCurrentValue(prev => prev ? `${prev}${value}` : value)
    }
    else if (isAnOperator) addOperator(value)
  }

  function disallowNonClosingParenthesesFirst(value: string) {
    const openingCount = arrOfValues.find(item => item === ("("))?.length ?? 0
    const closingCount = arrOfValues.find(item => item === (")"))?.length ?? 0
    let openingCountCurrentVal = 0
    let closingCountCurrentVal = 0
    for (var i = 0; i < currentValue.length; i++) {
      if (currentValue[i] === "(") openingCountCurrentVal++
      if (currentValue[i] === ")") closingCountCurrentVal++
    }
    if (openingCount + openingCountCurrentVal <= closingCount + closingCountCurrentVal) return true
    else return false
  }

  function addOperator(value: string) {
    if (currentValue === "") return
    //save operator, push currentValue to arrOfValues and reset currentValue
    setOperators((obj: any) => ({ ...obj, [arrOfValues.length]: value }))
    setArrOfValues((prev: string[]) => [...prev, currentValue])
    setCurrentValue("")
  }

  function queueCalculation() {
    // prevent calculation if the value ends with an operator. Eg 3+3+
    if (currentValue === "") return

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
    toCalculate, setCalculate2: setToCalculate
  }
}