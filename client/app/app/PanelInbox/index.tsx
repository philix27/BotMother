import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { Input } from 'components/ui/input'
import { ResizablePanel, ResizableHandle } from 'components/ui/resizable'
import { Separator } from '@radix-ui/react-select'
import { Search } from 'lucide-react'
import { MailList } from '../components/mail-list'
import { mails } from '../data'
import { MailDisplay } from '../components/mail-display'
import { useMail } from '../use-mail'

export default function PanelInbox() {
  const [mail] = useMail()
  return (
    <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30} minSize={30}>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
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
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails.filter((item) => !item.read)} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={30}>
        <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
      </ResizablePanel>
    </>
  )
}
