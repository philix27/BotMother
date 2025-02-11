'use client'

import { cn } from 'lib/utils'
import { AppStores } from 'lib/zustand'
import { Employee } from 'lib/zustand/employee'

export function Sidebar(props: { items: Employee[] }) {
  const store = AppStores.useEmployee()
  return (
    <div className="no-scrollbar h-[calc(100vh-80px)] overflow-y-scroll">
      <div className="mb-[150px] flex flex-col gap-2 p-4 pt-0">
        {props.items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'mb-[1px] flex border-b-card flex-col items-start rounded-lg border-b-4 p-1 text-left text-sm transition-all hover:bg-accent',
              store.active === item.emKey
                ? 'rounded-none border-b-4 border-b-primary shadow-md'
                : 'bg-card',
            )}
            onClick={() => {
              store.update({ active: item.emKey })
            }}
          >
            <div className="flex w-full">
              <div className="relative h-[80px] w-[120px] min-w-[100px] overflow-y-hidden">
                <img src={item.img} className=" absolute top-[-5px] h-[170%] w-full object-cover" />
              </div>

              <div className={cn('px-4 py-2')}>
                <div className="mb-3 flex w-full flex-col">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-md font-bold">{item.name}</p>
                      {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                </div>

                <div className="text-md line-clamp-2 text-xs text-muted-foreground">
                  {item.text.substring(0, 50)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
