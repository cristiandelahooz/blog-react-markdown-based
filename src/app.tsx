import { Container } from '@/atoms/container'
import { MainContent } from '@/components/main-content'
import { MarkdownView } from '@/components/markdown-view'
import './app.css'
import { PageTitle } from './components/page-title'

export default function App() {
  return (
    <Container>
      <MainContent>
        <PageTitle />
        <MarkdownView />
      </MainContent>
    </Container>
  )
}
