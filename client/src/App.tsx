import TodaysQuote from "./components/layout/TodaysQuote/TodaysQuote";
import Generator from "./components/layout/Generator/Generator";

function App() {

  return (
    <main className="min-h-[100vh] min-w-[100vw] pt-6 text-purple-400 bg-blue-100">
      <h1 className="text-3xl text-center font-bold tracking-tight leading-tight mb-5">
        Quote Generator
      </h1>
      <TodaysQuote />
      <Generator />
    </main>
  )
}

export default App
