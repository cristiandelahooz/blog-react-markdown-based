import { create } from 'zustand'
import { Container } from '@/atoms/container'
import { MainContent } from '@/components/main-content'
import './app.css'

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
    <Container>
      <MainContent>
        <h1>Sakidoa</h1>
        <div className="card">
          <button onClick={increment}>count is {count}!!!</button>
        </div>
      </MainContent>
    </Container>
  )
}
