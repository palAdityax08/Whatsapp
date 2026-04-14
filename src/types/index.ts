// ============================================
// Type Definitions for WhatsApp Clone
// ============================================

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastSeen: string;
  isOnline: boolean;
  phone: string;
}

export interface Message {
  id: string;
  contactId: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'contact';
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatState {
  messages: Record<string, Message[]>;
  contacts: Contact[];
  activeContactId: string | null;
  searchQuery: string;
}

export type ChatAction =
  | { type: 'SEND_MESSAGE'; payload: { contactId: string; text: string } }
  | { type: 'RECEIVE_MESSAGE'; payload: { contactId: string; text: string } }
  | { type: 'SET_ACTIVE_CONTACT'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'MARK_MESSAGES_READ'; payload: string }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'LOAD_MESSAGES'; payload: Record<string, Message[]> };
