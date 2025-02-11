'use client'

import Wrapper from 'components/privy/Wrapper'
import { usePublicClient } from 'wagmi'

import MonoLabel from './MonoLabel'

const PublicClient = () => {
  const provider = usePublicClient()

  return (
    <Wrapper title="usePublicClient">
      <p>
        Public Client loaded: <MonoLabel label={provider ? 'success' : 'waiting'} />
      </p>
    </Wrapper>
  )
}

export default PublicClient
