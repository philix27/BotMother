import { Signer, useClient } from '@xmtp/react-sdk'
import { useCallback } from 'react'
import { Notification } from './Notification'
import { useWalletClient } from 'wagmi'
import { BiLink } from 'react-icons/bi'
import { Button } from 'components/ui/button'

export function XMTPConnect() {
  const { isLoading, error, initialize } = useClient()
  const { data: walletClient } = useWalletClient()

  const handleConnect = useCallback(() => {
    try {
      void initialize({
        signer: walletClient as unknown as Signer,
        options: {
          env: 'production',
        },
      })

      // props.getConversations();
    } catch (error) {
      console.log('initErr', error)
    }
  }, [initialize, walletClient])

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="flex w-[70%] flex-col items-center">
          <div className="w-full">
            <img src={'/support.png'} className="h-[300px] w-auto" />
          </div>
          <p className="my-5">Something went wrong.</p>
          <Button onClick={handleConnect} className="w-fit">{`Try again`}</Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Notification icon={<BiLink />} title="Connecting to XMTP">
        Awaiting signatures...
      </Notification>
    )
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[70%] flex-col items-center">
        <div className="w-full">
          <img src={'/support.png'} className="h-[300px] w-auto" />
        </div>
        <p className="my-5">Welcome...</p>
        <Button onClick={handleConnect} className="w-fit">{`Connect & Get started`}</Button>
      </div>
    </div>
  )
}
