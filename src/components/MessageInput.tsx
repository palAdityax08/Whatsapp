import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../context/ChatContext';
import './MessageInput.css';

// ============================================
// MessageInput Component
// ============================================
// Handles composing and sending new messages
// with emoji support and auto-resize textarea.

interface MessageInputProps {
  contactId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ contactId }) => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useChat();

  const emojis = [
    '😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😱',
    '👍', '👋', '🙏', '💪', '🎉', '❤️', '🔥', '✨',
    '😢', '😡', '🤮', '🤯', '🥳', '😴', '🤗', '😈',
    '👀', '💀', '🤝', '✅', '💯', '🎵', '📸', '🍕',
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(contactId, trimmed);
    setText('');
    setShowEmoji(false);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [text, contactId, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    textareaRef.current?.focus();
  };

  return (
    <div className="message-input" id="message-input">
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="message-input__emoji-picker" ref={emojiRef} id="emoji-picker">
          <div className="message-input__emoji-grid">
            {emojis.map((emoji, i) => (
              <button
                key={i}
                className="message-input__emoji-btn"
                onClick={() => insertEmoji(emoji)}
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="message-input__container">
        {/* Emoji Toggle */}
        <button
          className={`message-input__icon-btn ${showEmoji ? 'message-input__icon-btn--active' : ''}`}
          id="emoji-toggle"
          onClick={() => setShowEmoji((prev) => !prev)}
          title="Emoji"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm5.603 0c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM11.984 1.01C5.926 1.01 1.01 5.926 1.01 11.984s4.916 10.974 10.974 10.974 10.974-4.916 10.974-10.974S18.042 1.01 11.984 1.01zm0 19.661c-4.796 0-8.687-3.891-8.687-8.687s3.891-8.687 8.687-8.687 8.687 3.891 8.687 8.687-3.891 8.687-8.687 8.687zm5.152-5.726c-.527.8-2.782 3.473-5.152 3.473s-4.625-2.672-5.152-3.473a.546.546 0 0 1 .906-.612c.389.575 2.276 2.927 4.246 2.927s3.857-2.352 4.246-2.927a.544.544 0 0 1 .906.612z" />
          </svg>
        </button>

        {/* Attachment Button */}
        <button className="message-input__icon-btn" id="attach-btn" title="Attach">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.501.501 1.171.798 1.834.798.664 0 1.26-.275 1.64-.654l5.937-5.937a.498.498 0 0 0-.707-.707L9.22 14.82a.954.954 0 0 1-.636.243.95.95 0 0 1-.643-.248c-.564-.562-.636-1.343-.168-1.811L15.69 5.09c1.062-1.063 3.002-.948 4.224.274.594.594.942 1.339.998 2.039.063.732-.201 1.451-.762 2.012l-9.548 9.548a4.58 4.58 0 0 1-3.166 1.309c-1.2 0-2.326-.466-3.174-1.313-.848-.848-1.313-1.974-1.313-3.171v-.004a4.585 4.585 0 0 1 1.312-3.17l7.916-7.916a.498.498 0 0 0-.707-.707L3.463 12.39a5.574 5.574 0 0 0-1.647 3.166z" />
          </svg>
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          className="message-input__textarea"
          id="message-textarea"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          autoComplete="off"
        />

        {/* Send / Mic Button */}
        {text.trim() ? (
          <button
            className="message-input__send-btn"
            id="send-message-btn"
            onClick={handleSend}
            title="Send"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
            </svg>
          </button>
        ) : (
          <button className="message-input__icon-btn" id="mic-btn" title="Voice message">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H4.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-3z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
