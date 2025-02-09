import React, { ReactNode } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/ui/resizable'

export default function Modal(props: { children: ReactNode; onBlankClick?: VoidFunction }) {
  return (
    <div className="fixed z-[10] flex h-screen w-screen bg-black/40">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          //   store.update({ defaultLayout: sizes })
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel defaultSize={65} minSize={20}>
          <div className="h-full w-full" onClick={props.onBlankClick} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={35} maxSize={70}>
          <div className="h-full w-full bg-card">{props.children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
