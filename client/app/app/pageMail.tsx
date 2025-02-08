'use client'
// import { cookies } from 'next/headers'
import Image from 'next/image'
import { accounts, mails } from './data'
import { Mail } from './components/mail'
import { AppStores } from 'lib/zustand'

export default function MailPage() {
  // const layout = localStorage.getItem('react-resizable-panels:layout:mail')
  // const collapsed = localStorage.getItem('react-resizable-panels:collapsed')

  const store = AppStores.useSettings()
  return (
    <>
      <div className="md:hidden h-screen">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={store.defaultLayout}
          defaultCollapsed={store.defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
