'use client'
import React, { useEffect } from 'react'
import { TooltipProvider } from 'components/ui/tooltip'
import { ResizablePanelGroup } from 'components/ui/resizable'
import { AppStores } from 'lib/zustand'
import MailInbox from './mail'
import AllModals from './modals/all'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

export default function Page() {
  const store = AppStores.useSettings()

  const router = useRouter()
  const { authenticated } = usePrivy()

  useEffect(() => {
    if (!authenticated) {
      router.push('/')
    }
  })
  return (
    <div className="h-screen flex-col  md:flex">
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            store.update({ defaultLayout: sizes })
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
          }}
          className="h-full items-stretch"
        >
          <MailInbox />
        </ResizablePanelGroup>
      </TooltipProvider>
      <AllModals />
    </div>
  )
}
