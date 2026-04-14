import React, { useMemo } from 'react';
import { useChat } from '../context/ChatContext';
import { useDebounce } from '../hooks/useDebounce';
import './ContactList.css';

// ============================================
// ContactList Component
// ============================================
// Renders the sidebar contact list with search,
// avatars, last messages, timestamps, and unread badges.

const ContactList: React.FC = () => {
  const {
    filteredContacts,
    activeContact,
    setActiveContact,
    setSearchQuery,
    state,
    getLastMessage,
    getUnreadCount,
  } = useChat();

  const debouncedQuery = useDebounce(state.searchQuery, 300);

  // useMemo: Sort contacts by last message timestamp
  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const lastA = getLastMessage(a.id);
      const lastB = getLastMessage(b.id);
      if (!lastA && !lastB) return 0;
      if (!lastA) return 1;
      if (!lastB) return -1;
      return new Date(lastB.timestamp).getTime() - new Date(lastA.timestamp).getTime();
    });
  }, [filteredContacts, getLastMessage, debouncedQuery]);

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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

  return (
    <div className="contact-list" id="contact-list">
      {/* Header */}
      <div className="contact-list__header">
        <div className="contact-list__header-left">
          <div className="contact-list__user-avatar">
            <span>You</span>
          </div>
          <h1 className="contact-list__title">Chats</h1>
        </div>
        <div className="contact-list__header-actions">
          <button className="contact-list__action-btn" id="new-chat-btn" title="New chat">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
            </svg>
          </button>
          <button className="contact-list__action-btn" id="menu-btn" title="Menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="contact-list__search">
        <div className="contact-list__search-wrapper">
          <svg className="contact-list__search-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z" />
          </svg>
          <input
            type="text"
            className="contact-list__search-input"
            id="search-contacts"
            placeholder="Search or start new chat"
            value={state.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          {state.searchQuery && (
            <button
              className="contact-list__search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Contact Items */}
      <div className="contact-list__items" id="contact-items">
        {sortedContacts.length === 0 ? (
          <div className="contact-list__empty">
            <p>No contacts found</p>
          </div>
        ) : (
          sortedContacts.map((contact) => {
            const lastMessage = getLastMessage(contact.id);
            const unreadCount = getUnreadCount(contact.id);
            const isActive = activeContact?.id === contact.id;

            return (
              <div
                key={contact.id}
                className={`contact-item ${isActive ? 'contact-item--active' : ''}`}
                id={`contact-${contact.id}`}
                onClick={() => setActiveContact(contact.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveContact(contact.id);
                  }
                }}
              >
                <div className="contact-item__avatar-wrapper">
                  <div
                    className="contact-item__avatar"
                    style={{ backgroundColor: getAvatarColor(contact.id) }}
                  >
                    {getInitials(contact.name)}
                  </div>
                  {contact.isOnline && <span className="contact-item__online-dot" />}
                </div>

                <div className="contact-item__info">
                  <div className="contact-item__top">
                    <span className="contact-item__name">{contact.name}</span>
                    {lastMessage && (
                      <span className={`contact-item__time ${unreadCount > 0 ? 'contact-item__time--unread' : ''}`}>
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="contact-item__bottom">
                    <span className="contact-item__last-message">
                      {lastMessage ? (
                        <>
                          {lastMessage.sender === 'user' && (
                            <span className="contact-item__check">
                              <svg viewBox="0 0 16 11" width="16" height="11" fill="currentColor">
                                <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.085a.465.465 0 0 0-.659-.003.461.461 0 0 0-.003.653l2.38 2.467a.493.493 0 0 0 .378.17.465.465 0 0 0 .36-.187l6.541-8.076a.45.45 0 0 0-.111-.651z" />
                              </svg>
                            </span>
                          )}
                          {lastMessage.text.length > 40
                            ? lastMessage.text.substring(0, 40) + '...'
                            : lastMessage.text}
                        </>
                      ) : (
                        <span className="contact-item__status">{contact.status}</span>
                      )}
                    </span>
                    {unreadCount > 0 && (
                      <span className="contact-item__badge">{unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContactList;
