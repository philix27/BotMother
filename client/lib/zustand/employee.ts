import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type IEmployees =
  | 'Crypto'
  | 'Finance'
  | 'TweetGenerator'
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
  allChat?: { msg: string; time: string }[]
}

export interface ISliceUpdate extends Required<ISlice> {
  update: (data: ISlice) => void
  clear: () => void
}

export const defaultValues: Required<ISlice> = {
  active: 'Crypto',
  allChat: [],
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
      name: 'screens',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
