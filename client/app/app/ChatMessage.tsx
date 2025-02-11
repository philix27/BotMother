import { IEmployees } from 'lib/zustand/employee'
import { ISliceUpdate } from 'lib/zustand/employee'
import { cn } from 'lib/utils'
import Markdown from 'react-markdown'

export function ChatMessage(props: {
  store: ISliceUpdate
  name: string
  text: string
  activeKey: IEmployees
}) {
  return (
    <div className="no-scrollbar h-[90vh] w-full gap-y-2 overflow-y-scroll px-8 pb-[100px] pt-4">
      {props.store.allChat
        .filter((val) => val.employee === props.activeKey)
        .map((val, i) => (
          <div
            key={i}
            className={cn('mb-2 flex w-full', !val.isMe ? 'justify-start' : 'justify-end')}
          >
            <div
              className={cn(
                'w-fit  max-w-[50%] rounded-lg',
                !val.isMe && 'bg-secondary text-white',
              )}
            >
              {val.isMe ? (
                <p className="p-3 font-light">{val.msg}</p>
              ) : (
                <Markdown
                  className={
                    'text-wrap break-words p-3 font-light [&>h3]:pb-3 [&>h3]:font-bold [&>h4]:font-bold [&>p]:pb-2'
                  }
                >
                  {val.msg}
                </Markdown>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
