import './App.css';
import { useCalculator } from './Calculator';

function App() {
  const {
    onClick,
    showCalculatedResult,
    arrOfValues, setArrOfValues,
    currentValue, setCurrentValue,
    operators, setOperators,
    calculate2, setCalculate2
  } = useCalculator();

  const DisplayCalcValues = () => <div>
    {arrOfValues.map((value, idx) => <span key={idx}>{value} {operators[idx]} {idx === arrOfValues.length - 1 && currentValue}</span>)}
  </div>

  const Box = ({ item, orangeColor }: { item: string, orangeColor: boolean }) =>
    <div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
      <div onClick={() => onClick(item)} className={`rounded-full h-20 w-20 flex items-center ${orangeColor ? "bg-orange-500" : "bg-purple-800"} justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none`}>{item}</div>
    </div>

  return (
    <div className="flex h-screen bg-fuchsia-900 justify-center items-center">
      <div className="mx-auto overflow-hidden mt-10 mb-2 bg-purple-900 shadow-lg  rounded-lg md:w-3/6 sm:w-4/6 pb-6">
        <div className="p-5 text-white text-center text-3xl bg-purple-900"><span className="text-orange-500">Calcu</span>lator</div>
        <div className="pt-16 p-5 pb-0 text-white text-right text-3xl bg-purple-800">
          <DisplayCalcValues />
        </div>
        {/* <div className="pt-16 p-5 pb-0 text-white text-right text-3xl bg-purple-800">2000 + 100</div> */}
        <div className="p-5 text-white text-right text-3xl bg-purple-800">= <span className="text-orange-500">{showCalculatedResult}</span></div>

        {[["%", "(", ")", "÷"], ["7", "8", "9", "×"], ["4", "5", "6", "-"], ["1", "2", "3", "+"], ["+", "0", ".", "="]].map((arr, indexArr) =>
          <div key={indexArr} className={`flex items-stretch bg-purple-900 h-24`}>
            {arr.map((item, indexItem) => <Box key={indexItem} item={item} orangeColor={indexItem === 3 && indexArr === arr.length} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
