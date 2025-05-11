import { Container } from '@/atoms/container'
import { MainContent } from '@/components/main-content'
import { MarkdownView } from '@/components/markdown-view'
import './app.css'
import { PageTitle } from './components/page-title'
import { Box, HStack } from '@kuma-ui/core'
import { MarkdownOutlineView } from './components/markdown-outline-view'

export default function App() {
  return (
    <Container>
      <MainContent>
        <PageTitle />
        <HStack gap={[0, 0, 0, '1em', '2em']}>
          <Box flexGrow={1} minWidth={0}>
            <MarkdownView />
          </Box>
          <Box
            display={['none', 'none', 'block', 'block']}
            flexGrow={0}
            flexShrink={0}
            flexBasis={[0, 0, 200, 200, 300]}
          >
            <Box
              position={'sticky'}
              top={16}
              maxHeight={'calc(100vh - 70px)'}
              overflow={'auto'}
            >
              <MarkdownOutlineView />
            </Box>
          </Box>
        </HStack>
      </MainContent>
    </Container>
  )
}
