'use client'

import * as React from 'react'
import { TooltipProvider } from 'components/ui/tooltip'
import { ResizablePanelGroup } from 'components/ui/resizable'
import PanelInbox from '../PanelInbox'
import { AppStores } from 'lib/zustand'
import type { IViews } from 'lib/zustand/screens'

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: any[]
  // mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const store = AppStores.useView()
  const settingsStore = AppStores.useSettings()
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          settingsStore.update({ defaultLayout: sizes })
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
        }}
        className="h-full items-stretch"
      >
        <PanelInbox />
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
