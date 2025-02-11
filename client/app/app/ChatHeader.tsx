'use client'

import { Avatar, AvatarImage } from 'components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { SidebarOpen } from 'lucide-react'
import ThemeToggler from 'app/home/ThemeToggler'
import { ISliceUpdate } from 'lib/zustand/settings'

export function ChatHeader(props: {
  name: string
  text: string
  img: string
  storeSettings: ISliceUpdate
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-start  gap-4 text-sm">
        <Avatar>
          <AvatarImage alt={props.name} src={props.img} className="size-[150%]" />
        </Avatar>
        <div className="gap-2">
          <div className="mb-2 font-semibold">{props.name}</div>
          <div className="text-xs">{props.text}</div>
        </div>
      </div>

      <div className="flex space-x-3">
        <ThemeToggler />
        <Tooltip>
          <TooltipTrigger>
            <SidebarOpen
              onClick={() => {
                props.storeSettings.update({ showCryptoModal: true })
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Wallet info</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
