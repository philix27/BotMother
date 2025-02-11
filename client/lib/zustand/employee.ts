import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { employeeData } from './employeeData'

export type Employee = (typeof employeeData)[number]
export type IEmployees =
  | 'Crypto'
  | 'CoinWatcher'
  | 'Finance'
  | 'TweetGenerator'
  | 'ImageGenerator'
  | 'LemonadeEventPlanner'
  | 'LinkedIn'
  | 'Instagram'
  | 'EmailMarketing'
  | 'Customer Support'
  | 'JobScout'
  | 'SalesManager'
  | 'DailyMotivation'
export type IBots = 'General' | 'DeFi' | 'WEB3'

export interface ISlice {
  active?: IEmployees
  allChat?: { msg: string; isMe: boolean; employee: IEmployees }[]
  chatText?: Record<IEmployees, string>
  employeeData?: Employee[]
  employeesToDisplay?: Employee[]
}

export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}

export const defaultValues: Required<ISlice> = {
  active: 'Crypto',
  allChat: [],
  chatText: {
    Crypto: '',
    Finance: '',
    TweetGenerator: '',
    LinkedIn: '',
    Instagram: '',
    EmailMarketing: '',
    'Customer Support': '',
    JobScout: '',
    SalesManager: '',
    DailyMotivation: '',
    CoinWatcher: '',
    ImageGenerator: '',
    LemonadeEventPlanner: ''
  },
  employeeData: employeeData,
  employeesToDisplay: employeeData,
}
export const useEmployee = create(
  persist<ISliceUpdate>(
    (set) => ({
      ...defaultValues,
      update: (data) =>
        set((state) => {
          return { ...state, ...data }
        }),
      clear: () =>
        set((state) => {
          return { ...state, ...defaultValues }
        }),
    }),
    {
      name: 'employee',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
