import type { ChangeEvent, KeyboardEvent } from 'react';
import { useCallback, forwardRef, useImperativeHandle, useState, useLayoutEffect, useRef } from 'react';
import { IconButton } from './IconButton';
import styles from './MessageInput.module.css';
import { AiOutlineArrowUp } from 'react-icons/ai';

type MessageInputProps = {
  /**
   * Is the CTA button disabled?
   */
  isDisabled?: boolean;
  /**
   * What happens on a submit?
   */
  onSubmit?: (msg: string) => Promise<void>;
  /**
   * What, if any, placeholder should we use for the input?
   */
  placeholder?: string;
  /**
   * What, if any, screen reader text should be used for the submit button
   */
  submitSrText?: string;
};

const MIN_TEXTAREA_HEIGHT = 32;

export const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
  ({ isDisabled, onSubmit, placeholder, submitSrText }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    // make external ref point to internal ref
    useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(ref, () => textAreaRef.current);
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (value) {
            void onSubmit?.(value);
            setValue('');
          }
        }
      },
      [onSubmit, value]
    );

    const handleClick = useCallback(() => {
      if (value) {
        void onSubmit?.(value);
        setValue('');
      }
    }, [onSubmit, value]);

    useLayoutEffect(() => {
      if (textAreaRef?.current?.value) {
        const currentScrollHeight = textAreaRef?.current.scrollHeight;
        textAreaRef.current.style.height = `${Math.max(currentScrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
      } else if (textAreaRef?.current) {
        textAreaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
      }
    }, [value]);

    return (
      <div className="w-full ">
        {placeholder && (
          <label htmlFor="chat" className={styles.label}>
            {placeholder}
          </label>
        )}
        <div className={`fixed bottom-[0px] p-4 w-full gap-2 bg-card flex items-center`}>
          <textarea
            name="chat"
            data-testid="message-input"
            onChange={onChange}
            onKeyDown={handleKeyDown}
            ref={textAreaRef}
            rows={1}
            placeholder={placeholder}
            value={value}
            disabled={isDisabled}
            className={`
              border-none resize-none
              outline-none w-full
               p-2 max-h-[10rem] 
               flex-grow bg-transparent
            `}
          />
          <IconButton
            testId="message-input-submit"
            variant="secondary"
            label={<AiOutlineArrowUp color="white" width="20" />}
            srText={submitSrText}
            onClick={handleClick}
            isDisabled={!value || isDisabled}
          />
        </div>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';
