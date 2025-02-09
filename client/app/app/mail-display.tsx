'use client'
import { Button } from 'components/ui/button'
import { Separator } from 'components/ui/separator'
import { Avatar, AvatarImage } from 'components/ui/avatar'
import { MdSend } from 'react-icons/md'
import { Input } from 'components/ui/input'
import { cn } from 'lib/utils'
import { AppStores } from 'lib/zustand'
import axios from 'axios'
import { Employee } from 'lib/zustand/employee'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { SidebarOpen } from 'lucide-react'

interface MailDisplayProps {
  mail: Employee | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const store = AppStores.useEmployee()
  const storeSettings = AppStores.useSettings()
  const sendMsg = async () => {
    console.log('Reach mutate')
    const key = mail ? mail.key : 'Crypto'

    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/employees/send-message', {
        msg: store.chatText[key],
      })
      .then((res) => {
        store.update({
          allChat: [
            ...store.allChat,
            {
              msg: store.chatText[key],
              isMe: true,
              employee: key,
            },
            {
              msg: res.data,
              isMe: false,
              employee: key,
            },
          ],
        })
      })
  }

  return (
    <div className="relative flex h-full flex-col">
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-start  gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} src={mail.img} className="size-[150%]" />
              </Avatar>
              <div className="gap-2">
                <div className="mb-2 font-semibold">{mail.name}</div>
                <div className="text-xs">{mail.text}</div>
              </div>
            </div>

            <div>
              <Tooltip>
                <TooltipTrigger>
                  <SidebarOpen
                    onClick={() => {
                      storeSettings.update({ showCryptoModal: true })
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Wallet info</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Separator />
          <div className="h-[90vh] w-full gap-y-2 overflow-y-scroll px-8 pb-[100px] pt-4">
            {store.allChat
              .filter((val) => val.employee === mail.key)
              .map((val, i) => (
                <div
                  key={i}
                  className={cn('mb-2 flex w-full', !val.isMe ? 'justify-start' : 'justify-end')}
                >
                  <div
                    className={cn(
                      'w-fit  max-w-[50%] rounded-lg',
                      !val.isMe ? mail.color : 'bg-card',
                      !val.isMe && 'bg-secondary text-white',
                    )}
                  >
                    <p className="p-3">{val.msg}</p>
                  </div>
                </div>
              ))}
          </div>
          <Separator className="mt-auto" />

          <div className="absolute bottom-0 my-[30px] flex w-full items-center justify-center">
            <div className="flex w-[65%] max-w-[60%] items-center justify-between gap-4 rounded-lg bg-card  p-3">
              <Input
                className=""
                placeholder={`Reply ${mail.name}...`}
                value={store.chatText[mail.key]}
                onChange={(e) => {
                  store.update({ chatText: { ...store.chatText, [mail.key]: e.target.value } })
                }}
              />
              <Button
                onClick={() => {
                  console.log('Button clicked')
                  store.update({ chatText: { ...store.chatText, [mail.key]: '' } })
                  sendMsg()
                }}
                className={cn('rounded-full bg-primary', mail.color)}
              >
                <MdSend className="size-[24px]" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  )
}
