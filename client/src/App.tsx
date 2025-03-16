import TodaysQuote from "./components/layout/TodaysQuote/TodaysQuote";
import Generator from "./components/layout/Generator/Generator";

function App() {

  return (
    <>
      <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight mb-5 mt-5">Quote Generator</h1>
      <TodaysQuote />
      <Generator />
    </>
  )
}

export default App
