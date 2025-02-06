'use client';
import './App.css';
import {
  CachedConversation,
  useClient,
  useConsent,
  useConversations,
  useSendMessage,
  useStartConversation,
  useStreamConversations,
} from '@xmtp/react-sdk';
import { useCallback, useEffect, useState } from 'react';
import { use3Wagmi } from '@/lib';
import { Spinner, AppButton, AppTextInput } from '@/comps';
import { XMTPConnect } from './XMTPConnect';
import { Messages } from './Messages';
import { Button } from 'components/ui/button';

export const SUPPORT_ADDRESS = '0x20F50b8832f87104853df3FdDA47Dd464f885a49';
// export const SUPPORT_ADDRESS = '0xe6b6aAe8fA2718F5371e30F2ad2eEDa250801BB5';

export const App = () => {
  const { client, disconnect } = useClient();
  const { address } = use3Wagmi();

  // disconnect XMTP client when the wallet changes
  useEffect(() => {
    void disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!client) {
    return <XMTPConnect />;
  }

  return <Inbox />;
};

function Inbox() {
  const { loadConsentList } = useConsent();
  const [selectedConversation, setSelectedConversation] = useState<CachedConversation | undefined>(undefined);

  const { startConversation } = useStartConversation();
  const { conversations, isLoading } = useConversations();
  useStreamConversations();
  const { sendMessage } = useSendMessage();

  const handleConversationClick = useCallback((convo: CachedConversation) => {
    setSelectedConversation(convo);
  }, []);

  const getConvo = async () => {
    const supportConversation = conversations.filter((conversation) => conversation.peerAddress === SUPPORT_ADDRESS)[0];
    console.log('supportConversation:', supportConversation);
    handleConversationClick!(supportConversation);
    // sendMessage("")
    if (!supportConversation) {
      const result = await startConversation(SUPPORT_ADDRESS, 'Hello!');

      if (result) {
        console.log('Message sent successfully');
      }
    }
  };

  useEffect(() => {
    void loadConsentList();
  }, []);

  return (
    <div className="flex flex-col h-screen mb-[100px]">
      <div className="flex flex-col w-full items-center justify-center h-full">
        {isLoading && <Spinner />}
        {selectedConversation ? (
          <Messages conversation={selectedConversation} />
        ) : (
          <>
            <Button className="w-fit h-fit" onClick={getConvo}>
              Get conv
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
