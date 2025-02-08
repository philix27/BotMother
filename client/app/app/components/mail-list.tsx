'use client'
import type { ComponentProps } from 'react'
import * as dtFns from 'date-fns'

import { cn } from 'lib/utils'
import type { Mail } from '../PanelInbox/comps'
import { useMail } from '../use-mail'
import { Badge } from 'lucide-react'
import { ScrollArea } from 'components/ui/scroll-area'
import { AppStores } from 'lib/zustand'

interface MailListProps {
  items: Mail[]
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail()
  const store = AppStores.useEmployee()

  return (
    <div className="h-[calc(100vh-80px)] no-scrollbar overflow-y-scroll">
      <div className="mb-[150px] flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col shadow-md items-start rounded-lg mb-2 text-left text-sm transition-all hover:bg-accent',
              mail.selected === item.id && 'border-2 border-primary bg-card',
            )}
            onClick={() => {
              store.update({ active: item.key })
              setMail({
                ...mail,
                selected: item.id,
              })
            }}
          >
            <div className="flex w-full">
              <div className="relative h-[130px] w-[120px] min-w-[100px] overflow-y-hidden">
                <img
                  src={item.img}
                  className=" absolute top-[-20px] h-[150%] w-full object-cover"
                />
              </div>

              <div className="px-4 py-2">
                <div className="mb-3 flex w-full flex-col">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-medium">{item.name}</div>
                      {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                </div>

                <div className="text-md line-clamp-2 text-muted-foreground">
                  {item.text.substring(0, 300)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
