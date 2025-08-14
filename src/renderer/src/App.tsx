import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="pt-18">
          <ActionButtonsRow className="flex justify-between z-20" />
          <NotePreviewList className="mt-2 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-white/10 dark:bg-zinc-900/20 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
