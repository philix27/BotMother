'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import useSWR from 'swr'
import axios from 'axios'
import { useAccount, useBalance,  } from 'wagmi'
import Spinner from 'components/app/Spinner'
import { Button } from 'components/ui/button'

export default function CryptoModal() {
    const { address, } = useAccount()
  
  const { data, error, isLoading } = useSWR('getWallets', async () => {
    console.log("process.env.BACKEND_URL" , process.env.BACKEND_URL )
    const res = axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/wallets?id=' + address);
    const data = (await res).data
    return data as { walletId: string; chainType: string;  address:string}[]
  })

    const createWallet = async () => {

    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/wallets/create', {
       userId: address,
      })
      .then((res) => {
       
      })
  }


  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>
  return (
    <div className="">
      <Tabs defaultValue="wallet">
        <div className="w-full bg-background">
          <TabsList className="flex w-full items-center justify-around">
            <TabsTrigger
              value="wallet"
              className="h-full w-full py-5 text-zinc-600 hover:bg-primary dark:text-zinc-200"
            >
              Wallet
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="h-full w-full py-5 text-zinc-600 hover:bg-primary dark:text-zinc-200"
            >
              Stats
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="wallet" className="p-2">
          <div>
            {!data ? <Spinner /> : data.map((val, i) => (
              <div key={i}
              className='w-full rounded-lg py-2 px-3 bg-background mb-4'>
            <p className='text-wrap mb-4 text-primary'>{val.address}</p>
                <div className='gap-y-4'>
                  <Balance wAddr={val.address} />
                   <p className='text-xs text-muted'>Wallet ID: {val.walletId}</p>
                  <p className='text-xs text-muted'>Chain Type: {val.chainType.toUpperCase()}</p>
              </div>
              </div>
            ))}
          </div>
          <div className='flex w-full items-center justify-center'>
            <Button className=''
              onClick={() => {
            createWallet()
          }}>Create New</Button>
         </div>
        </TabsContent>
        <TabsContent value="stats" className="m-0 p-2">
          <p>Charts</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}


function Balance(params: { wAddr: string }) {
  const ba = useBalance({
    address: params.wAddr as `0x${string}`,
  })
if(ba.isLoading)   return <p className='text-xs text-muted'>Bal: ...</p>
  return <p className='text-md text-muted'>Bal: {ba.data?.value.toString()}</p>
  
}