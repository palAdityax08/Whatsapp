import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { ChatState, ChatAction, Message, Contact } from '../types';
import { initialContacts, initialMessages } from '../data/contacts';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAutoReply } from '../hooks/useDebounce';

// ============================================
// Chat Reducer (useReducer)
// ============================================
// Manages all chat-related state transitions

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const { contactId, text } = action.payload;
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        contactId,
        text,
        timestamp: new Date().toISOString(),
        sender: 'user',
        status: 'sent',
      };
      const contactMessages = state.messages[contactId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...contactMessages, newMessage],
        },
      };
    }

    case 'RECEIVE_MESSAGE': {
      const { contactId, text } = action.payload;
      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        contactId,
        text,
        timestamp: new Date().toISOString(),
        sender: 'contact',
        status: 'delivered',
      };
      const contactMessages = state.messages[contactId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...contactMessages, newMessage],
        },
      };
    }

    case 'SET_ACTIVE_CONTACT':
      return {
        ...state,
        activeContactId: action.payload,
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'MARK_MESSAGES_READ': {
      const contactId = action.payload;
      const messages = state.messages[contactId];
      if (!messages) return state;
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: messages.map((msg) =>
            msg.sender === 'contact' ? { ...msg, status: 'read' as const } : msg
          ),
        },
      };
    }

    case 'DELETE_CHAT': {
      const { [action.payload]: _, ...remainingMessages } = state.messages;
      return {
        ...state,
        messages: remainingMessages,
        activeContactId: state.activeContactId === action.payload ? null : state.activeContactId,
      };
    }

    case 'LOAD_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
}

// ============================================
// Context Types
// ============================================

interface ChatContextType {
  state: ChatState;
  contacts: Contact[];
  activeContact: Contact | null;
  filteredContacts: Contact[];
  sendMessage: (contactId: string, text: string) => void;
  setActiveContact: (contactId: string | null) => void;
  setSearchQuery: (query: string) => void;
  deleteChat: (contactId: string) => void;
  getLastMessage: (contactId: string) => Message | null;
  getUnreadCount: (contactId: string) => number;
}

const ChatContext = createContext<ChatContextType | null>(null);

// ============================================
// Context Provider Component
// ============================================

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Load saved messages from localStorage using custom hook
  const [savedMessages, setSavedMessages] = useLocalStorage<Record<string, Message[]>>(
    'whatsapp_clone_messages',
    {}
  );

  // Build initial messages with proper Message objects
  const buildInitialMessages = (): Record<string, Message[]> => {
    // If we have saved messages, use those
    if (Object.keys(savedMessages).length > 0) {
      return savedMessages;
    }
    // Otherwise, build from seed data
    const messages: Record<string, Message[]> = {};
    for (const [contactId, msgs] of Object.entries(initialMessages)) {
      messages[contactId] = msgs.map((msg, index) => ({
        id: `seed_${contactId}_${index}`,
        contactId,
        text: msg.text,
        timestamp: new Date(Date.now() - (msgs.length - index) * 60000).toISOString(),
        sender: msg.sender,
        status: 'read' as const,
      }));
    }
    return messages;
  };

  const initialState: ChatState = {
    messages: buildInitialMessages(),
    contacts: initialContacts,
    activeContactId: null,
    searchQuery: '',
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    setSavedMessages(state.messages);
  }, [state.messages, setSavedMessages]);

  // Auto-reply handler
  const handleAutoReply = useCallback((contactId: string, text: string) => {
    dispatch({ type: 'RECEIVE_MESSAGE', payload: { contactId, text } });
  }, []);

  const triggerAutoReply = useAutoReply(handleAutoReply);

  // Send message action
  const sendMessage = useCallback((contactId: string, text: string) => {
    dispatch({ type: 'SEND_MESSAGE', payload: { contactId, text } });
    // Trigger auto-reply from the contact
    triggerAutoReply(contactId);
  }, [triggerAutoReply]);

  const setActiveContact = useCallback((contactId: string | null) => {
    dispatch({ type: 'SET_ACTIVE_CONTACT', payload: contactId });
    if (contactId) {
      dispatch({ type: 'MARK_MESSAGES_READ', payload: contactId });
    }
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const deleteChat = useCallback((contactId: string) => {
    dispatch({ type: 'DELETE_CHAT', payload: contactId });
  }, []);

  // useMemo: compute the active contact from contacts list
  const activeContact = useMemo(() => {
    if (!state.activeContactId) return null;
    return state.contacts.find((c) => c.id === state.activeContactId) || null;
  }, [state.activeContactId, state.contacts]);

  // useMemo: filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!state.searchQuery.trim()) return state.contacts;
    const query = state.searchQuery.toLowerCase();
    return state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query)
    );
  }, [state.searchQuery, state.contacts]);

  // Helper to get last message for a contact
  const getLastMessage = useCallback((contactId: string): Message | null => {
    const messages = state.messages[contactId];
    if (!messages || messages.length === 0) return null;
    return messages[messages.length - 1];
  }, [state.messages]);

  // Helper to get unread message count
  const getUnreadCount = useCallback((contactId: string): number => {
    const messages = state.messages[contactId];
    if (!messages) return 0;
    return messages.filter(
      (msg) => msg.sender === 'contact' && msg.status !== 'read'
    ).length;
  }, [state.messages]);

  const value: ChatContextType = {
    state,
    contacts: state.contacts,
    activeContact,
    filteredContacts,
    sendMessage,
    setActiveContact,
    setSearchQuery,
    deleteChat,
    getLastMessage,
    getUnreadCount,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// ============================================
// Custom Hook: useChat
// ============================================
// Provides easy access to the ChatContext

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
