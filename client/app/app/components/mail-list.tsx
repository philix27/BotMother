'use client'

import { cn } from 'lib/utils'
import { AppStores } from 'lib/zustand'
import { Employee } from 'lib/zustand/employee'

export function MailList(props: { items: Employee[] }) {
  const store = AppStores.useEmployee()
  return (
    <div className="no-scrollbar h-[calc(100vh-80px)] overflow-y-scroll">
      <div className="mb-[150px] flex flex-col gap-2 p-4 pt-0">
        {props.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'mb-1 flex flex-col items-start rounded-lg border-primary text-left text-sm shadow-md transition-all hover:bg-accent',
              store.active == item.key ? item.color : 'bg-card',
            )}
            onClick={() => {
              store.update({ active: item.key })
            }}
          >
            <div className="flex w-full">
              <div className="relative h-[130px] w-[120px] min-w-[100px] overflow-y-hidden">
                <img
                  src={item.img}
                  className=" absolute top-[-20px] h-[150%] w-full object-cover"
                />
              </div>

              <div className={cn('px-4 py-2', store.active === item.key && 'text-white')}>
                <div className="mb-3 flex w-full flex-col">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium">{item.name}</p>

                      {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                </div>

                <div className="text-md line-clamp-2 text-muted-foreground">
                  {item.text.substring(0, 300)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
