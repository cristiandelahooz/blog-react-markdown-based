import { create } from 'zustand'
import reactLogo from './assets/react.svg'
import './App.css'

interface CounterState {
  count: number
  increment: () => void
}
const userCounterSore = create<CounterState>(set => ({
  count: 0,
  increment: () =>
    set(state => ({
      count: ++state.count
    }))
}))
export default function App() {
  const { count, increment } = userCounterSore()
  return (
    <>
      <div>
        <a href="https://github.com/cristiandelahooz" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="animation-h1">Sakidoa</h1>
      <div className="card">
        <button onClick={increment}>count is {count}!!!</button>
      </div>
    </>
  )
}
