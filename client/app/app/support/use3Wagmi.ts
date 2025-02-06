'use client';
import { useAppRouter, AppStores, web3AuthInstance } from '@/lib';
import { useCallback, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const use3Wagmi = () => {
  const store = AppStores.useChat();
  const router = useAppRouter();
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error: connectionErr, isLoading } = useConnect();
  const { disconnect } = useDisconnect();

  const login = useCallback(() => {
    const activeCon = connectors.filter((con) => con.name.toUpperCase() === 'WEB3AUTH')[0];

    connect({
      connector: activeCon,
    });
  }, []);

  const logout = async () => {
    disconnect();
    store.clear();
    router.push('/');
  };

  const value = useMemo(
    () => ({
      address,
      isConnected,
      isLoading,
    }),
    [address, isConnected, isLoading, isConnected]
  );

  return {
    logout,
    connector,
    connectionErr,
    login,
    ...value,
  };
};
