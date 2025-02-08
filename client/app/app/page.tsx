'use client'
import React from 'react'
import { mails } from './PanelInbox/data'
import { Mail } from './components/mail'
import { AppStores } from 'lib/zustand'
import { accounts } from './PanelInbox/comps'

export default function Page() {
  const store = AppStores.useSettings()
  return (
    <div className="h-screen flex-col  md:flex">
      <Mail
        accounts={accounts}
        mails={mails}
        defaultLayout={store.defaultLayout}
        defaultCollapsed={store.defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  )
}
