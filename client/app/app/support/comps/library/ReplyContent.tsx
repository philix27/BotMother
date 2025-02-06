import type { CachedMessage } from '@xmtp/react-sdk';
import { useReply } from '@xmtp/react-sdk';
import type { Reply } from '@xmtp/content-type-reply';
import { ContentTypeId } from '@xmtp/content-type-primitives';
import { MessageContent } from './MessageContent';

type ReplyProps = {
  message: CachedMessage;
  isIncoming?: boolean;
};

export const ReplyContent: React.FC<ReplyProps> = ({ message, isIncoming }) => {
  const { originalMessage } = useReply(message);

  const reply = message.content as Reply;
  const replyMessage = {
    ...message,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    content: reply.content,
    contentType: new ContentTypeId(reply.contentType).toString(),
  } satisfies CachedMessage;

  return (
    <>
      <div>
        {originalMessage ? (
          <MessageContent message={originalMessage} isIncoming={isIncoming} isRepliedTo />
        ) : (
          'Loading original message...'
        )}
      </div>
      <div>
        <MessageContent message={replyMessage} isIncoming={isIncoming} />
      </div>
    </>
  );
};
