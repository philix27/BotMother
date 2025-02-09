import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'

export default function CryptoModal() {
  return (
    <div className="">
      <Tabs defaultValue="wallet">
        <div className="w-full bg-background">
          <TabsList className="flex w-full items-center justify-around">
            <TabsTrigger
              value="wallet"
              className="h-full w-full py-5 text-zinc-600 hover:bg-primary dark:text-zinc-200"
            >
              Wallet
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="h-full w-full py-5 text-zinc-600 hover:bg-primary dark:text-zinc-200"
            >
              Stats
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="m-0 p-2">
          <p>Wallet</p>
        </TabsContent>
        <TabsContent value="unread" className="m-0 p-2">
          <p>Charts</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
