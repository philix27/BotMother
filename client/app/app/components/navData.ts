import type { IViews } from 'lib/zustand/screens'
import { Inbox, File, Group, type LucideIcon } from 'lucide-react'

export const navData: {
  title: string
  label?: string | undefined
  icon: LucideIcon
  variant: 'default' | 'ghost'
  view: IViews
}[] = [
  {
    title: 'Employees',
    label: '128',
    icon: Inbox,
    variant: 'default',
    view: 'INBOX',
  },
  {
    title: 'Bots',
    label: '9',
    icon: File,
    variant: 'ghost',
    view: 'BOTS',
  },
  {
    title: 'Group',
    label: '',
    icon: Group,
    variant: 'ghost',
    view: 'GROUPS',
  },
]
