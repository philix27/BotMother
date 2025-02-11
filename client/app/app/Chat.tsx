'use client'
import { Button } from 'components/ui/button'
import { Separator } from 'components/ui/separator'
import { MdSend } from 'react-icons/md'
import { Input } from 'components/ui/input'
import { cn } from 'lib/utils'
import { AppStores } from 'lib/zustand'
import axios from 'axios'
import { Employee } from 'lib/zustand/employee'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'

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
          <ChatHeader storeSettings={storeSettings} {...mail} />
          <Separator />
          <ChatMessage store={store} {...mail} />
          <Separator className="mt-auto" />

          <div className="absolute bottom-0 my-[30px] flex w-full items-center justify-center">
            <div className="flex w-[65%] max-w-[60%] items-center justify-between gap-4 rounded-lg bg-card  p-1">
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
                variant={'default'}
                size={'sm'}
                className={cn('rounded-md ')}
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
