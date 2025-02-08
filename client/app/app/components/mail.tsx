'use client'
import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { Input } from 'components/ui/input'
import { ResizablePanel, ResizableHandle } from 'components/ui/resizable'
import { Separator } from 'components/ui/separator'
import { Search } from 'lucide-react'
import { MailList } from './mail-list'
import { MailDisplay } from './mail-display'
import { AppStores } from 'lib/zustand'

export default function PanelInbox() {
  // const [mail] = useMail()
  const store = AppStores.useEmployee()

  return (
    <>
      <ResizablePanel defaultSize={30} minSize={30} maxSize={35}>
        <Tabs defaultValue="all">
          <div className="flex h-[60px] items-center px-4 py-2 pl-10">
            <a href="/">
              <h1 className="text-xl font-bold text-primary">Employee.ai</h1>
            </a>
            <TabsList className="ml-auto">
              <TabsTrigger value="all" className="mx-2 text-zinc-600 dark:text-zinc-200">
                All mail
              </TabsTrigger>
              <TabsTrigger value="unread" className="mx-2 text-zinc-600 dark:text-zinc-200">
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0">
            <MailList items={store.employeeData} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={store.employeeData.filter((item) => !item.read)} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={40}>
        <MailDisplay
          mail={store.employeeData.filter((item) => item.key === store.active)[0] || null}
        />
      </ResizablePanel>
    </>
  )
}
