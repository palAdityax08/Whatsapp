import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useChat } from '../context/ChatContext';
import Message from './Message';
import MessageInput from './MessageInput';
import './ChatWindow.css';

// ============================================
// ChatWindow Component
// ============================================
// Displays the chat area with header, messages,
// and input field for the selected contact.

const ChatWindow: React.FC = () => {
  const { activeContact, state, setActiveContact, deleteChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get messages for active contact
  const messages = useMemo(() => {
    if (!activeContact) return [];
    return state.messages[activeContact.id] || [];
  }, [activeContact, state.messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    '#00a884', '#02b884', '#25d366', '#128c7e',
    '#075e54', '#34b7f1', '#7c3aed', '#ec4899',
    '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6',
  ];

  const getAvatarColor = (id: string): string => {
    const index = parseInt(id) % avatarColors.length;
    return avatarColors[index];
  };

  // Empty state - no contact selected
  if (!activeContact) {
    return (
      <div className="chat-window chat-window--empty" id="chat-window">
        <div className="chat-window__empty-state">
          <div className="chat-window__empty-icon">
            <svg viewBox="0 0 303 172" width="250" height="142">
              <path fill="#00a884" opacity="0.4" d="M229.565 160.229c32.647-25.618 50.26-67.09 32.263-104.193C244.339 20.073 201.79.484 157.478.484c-53.418 0-100.692 33.062-117.036 78.614-13.696 38.15-.468 74.864 22.382 99.439a117.39 117.39 0 0 0 12.561 11.427c33.777 26.33 87.015 28.917 121.324 4.154 7.024-5.072 6.267-5.072 6.267-5.072l26.59-28.017z" />
              <path fill="#00a884" opacity="0.15" d="M131.589 68.942s-24.276 4.876-31.855 30.17c-5.283 17.622 5.115 31.955 5.115 31.955l59.263-.063s12.629-15.005 7.003-33.406c-8.116-26.556-39.526-28.656-39.526-28.656z" />
              <g fill="none" stroke="#00a884" strokeWidth="3">
                <circle cx="152" cy="90" r="40" />
                <path d="M152 70v40M132 90h40" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          <h2 className="chat-window__empty-title">WhatsApp Clone</h2>
          <p className="chat-window__empty-subtitle">
            Send and receive messages with your contacts.<br />
            Select a conversation to start chatting.
          </p>
          <div className="chat-window__empty-footer">
            <svg viewBox="0 0 10 12" width="10" height="12" fill="currentColor" opacity="0.4">
              <path d="M5.002 10.844c-2.67 0-4.842-2.171-4.842-4.842S2.333 1.16 5.002 1.16 9.844 3.33 9.844 6.002s-2.171 4.842-4.842 4.842zm0-1a3.842 3.842 0 1 0 0-7.684 3.842 3.842 0 0 0 0 7.684z" />
            </svg>
            <span>Messages are stored locally in your browser</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window" id="chat-window">
      {/* Chat Header */}
      <div className="chat-window__header" id="chat-header">
        <button
          className="chat-window__back-btn"
          id="back-btn"
          onClick={() => setActiveContact(null)}
          title="Back"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(180, 12, 12)" />
          </svg>
        </button>

        <div className="chat-window__header-info" id="chat-header-info">
          <div
            className="chat-window__header-avatar"
            style={{ backgroundColor: getAvatarColor(activeContact.id) }}
          >
            {getInitials(activeContact.name)}
          </div>
          <div className="chat-window__header-text">
            <h2 className="chat-window__header-name">{activeContact.name}</h2>
            <p className="chat-window__header-status">
              {activeContact.isOnline ? 'online' : `last seen ${activeContact.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="chat-window__header-actions">
          <button className="chat-window__action-btn" id="search-chat-btn" title="Search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" />
            </svg>
          </button>
          <div className="chat-window__dropdown-container" ref={dropdownRef}>
            <button
              className="chat-window__action-btn"
              id="chat-menu-btn"
              onClick={() => setShowDropdown((prev) => !prev)}
              title="Menu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
              </svg>
            </button>
            {showDropdown && (
              <div className="chat-window__dropdown" id="chat-dropdown">
                <button
                  className="chat-window__dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  Contact info
                </button>
                <button
                  className="chat-window__dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  Select messages
                </button>
                <button
                  className="chat-window__dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  Mute notifications
                </button>
                <button
                  className="chat-window__dropdown-item chat-window__dropdown-item--danger"
                  id="delete-chat-btn"
                  onClick={() => {
                    deleteChat(activeContact.id);
                    setShowDropdown(false);
                  }}
                >
                  Delete chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-window__messages" id="messages-container">
        <div className="chat-window__messages-inner">
          {messages.length === 0 ? (
            <div className="chat-window__no-messages">
              <div className="chat-window__no-messages-badge">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" opacity="0.6">
                  <path d="M8 1a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm0 12.5A5.5 5.5 0 1 1 13.5 8 5.506 5.506 0 0 1 8 13.5zM7 7h2v5H7zm0-3h2v2H7z" />
                </svg>
                Messages are end-to-end encrypted. No one outside of this chat can read them.
              </div>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isConsecutive =
                index > 0 &&
                messages[index - 1].sender === msg.sender;
              return (
                <Message
                  key={msg.id}
                  message={msg}
                  isConsecutive={isConsecutive}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput contactId={activeContact.id} />
    </div>
  );
};

export default ChatWindow;
