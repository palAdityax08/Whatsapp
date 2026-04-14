import React from 'react';
import { Message as MessageType } from '../types';
import './Message.css';

// ============================================
// Message Component
// ============================================
// Renders individual message bubbles with
// timestamps, read receipts, and animations.

interface MessageProps {
  message: MessageType;
  isConsecutive: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isConsecutive }) => {
  const isUser = message.sender === 'user';

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = () => {
    if (!isUser) return null;
    switch (message.status) {
      case 'sent':
        return (
          <svg viewBox="0 0 16 11" width="14" height="11" className="message__status-icon message__status-icon--sent">
            <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.085a.465.465 0 0 0-.659-.003.461.461 0 0 0-.003.653l2.38 2.467a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" fill="currentColor" />
          </svg>
        );
      case 'delivered':
        return (
          <svg viewBox="0 0 16 11" width="14" height="11" className="message__status-icon message__status-icon--delivered">
            <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.085a.465.465 0 0 0-.659-.003.461.461 0 0 0-.003.653l2.38 2.467a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" fill="currentColor" />
            <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.244-.655.673 1.9 1.97a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" fill="currentColor" transform="translate(-3, 0)" />
          </svg>
        );
      case 'read':
        return (
          <svg viewBox="0 0 16 11" width="14" height="11" className="message__status-icon message__status-icon--read">
            <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.085a.465.465 0 0 0-.659-.003.461.461 0 0 0-.003.653l2.38 2.467a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" fill="#53bdeb" />
            <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.244-.655.673 1.9 1.97a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" fill="#53bdeb" transform="translate(-3, 0)" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`message ${isUser ? 'message--user' : 'message--contact'} ${isConsecutive ? 'message--consecutive' : ''}`}
      id={`message-${message.id}`}
    >
      <div className={`message__bubble ${isUser ? 'message__bubble--user' : 'message__bubble--contact'}`}>
        {!isConsecutive && <div className={`message__tail ${isUser ? 'message__tail--user' : 'message__tail--contact'}`} />}
        <p className="message__text">{message.text}</p>
        <div className="message__meta">
          <span className="message__time">{formatTime(message.timestamp)}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
