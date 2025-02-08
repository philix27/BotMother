import { atom, useAtom } from 'jotai'
import { mails } from './PanelInbox/data'
import { Mail } from './PanelInbox/comps'

type Config = {
  selected: Mail['id'] | null
}

const configAtom = atom<Config>({
  selected: mails[0].id,
})

export function useMail() {
  return useAtom(configAtom)
}
