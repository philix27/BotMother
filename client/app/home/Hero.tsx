'use client'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from 'components/ui/button'
import { useRouter } from 'next/navigation'
import { useAccount, useDisconnect } from 'wagmi'

export function Body() {
  const router = useRouter()
  const { ready, user, authenticated, login, connectWallet, logout, linkWallet } = usePrivy()
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  return (
    <div className="mt-[70px] flex h-full  w-full bg-background">
      <div className="grid w-full grid-cols-1 items-center justify-between px-10 md:grid-cols-2">
        <div
          className="wow fadeInUp mx-4 mt-[-200px] w-full flex-col gap-y-4 md:mx-10"
          data-wow-delay=".2s"
        >
          <h1 className="mb-4 text-3xl font-bold leading-tight  sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Your employees that never sleep.
          </h1>
          <p className="mb-10 max-w-[95%] !leading-relaxed  sm:text-lg md:max-w-[45%] md:text-xl">
            Build, grow, and scale your personal brand with a team of AI employees.
          </p>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {ready && !authenticated ? (
              <Button onClick={login}>Login</Button>
            ) : (
              <Button
                onClick={() => {
                  router.push('/app')
                }}
              >
                Get started
              </Button>
           
            )}
          </div>
        </div>
        <div className="h-full w-full">
          <img src="/employees/employeeGroup.webp" className="w-[120%]" />
        </div>
      </div>
    </div>
  )
}
