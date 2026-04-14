# 💬 WhatsApp Web Clone

A fully functional **WhatsApp Web-like chat application** built with **React.js** and **Vite**, featuring real-time message interactions, contact management, and browser-based message persistence.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript)

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/whatsapp-clone.git
cd whatsapp-clone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design Choices

### UI/UX
- **Dark Theme**: Authentic WhatsApp Web dark mode color palette for an immersive experience
- **Responsive Design**: Full mobile responsiveness with sliding sidebar navigation
- **WhatsApp-like Layout**: Two-panel layout with contact sidebar (left) and chat window (right)
- **Message Bubbles**: Custom-styled with tail indicators, timestamps, and read receipts (single tick, double tick, blue ticks)
- **Smooth Animations**: Message slide-in effects, badge pop animations, emoji picker transitions
- **Typography**: Inter font from Google Fonts for a clean, modern look

### Architecture
- **Component-Based**: Modular React components (ContactList, ChatWindow, Message, MessageInput)
- **State Management**: Centralized state using React Context API + useReducer pattern
- **Data Persistence**: All messages are automatically saved to and loaded from localStorage
- **Auto-Reply System**: Contacts simulate real replies with random responses after 1-4 seconds
- **Search**: Real-time debounced contact search functionality

---

## 🧩 Challenges Faced

1. **Message Persistence**: Implementing seamless localStorage sync without causing unnecessary re-renders required careful use of `useEffect` dependencies and memoized setters.

2. **Auto-Scroll Behavior**: Ensuring the chat window auto-scrolls to the latest message while preserving scroll position when the user is reading older messages.

3. **Responsive Design**: Managing the sidebar/chat panel toggle on mobile required CSS transitions coordinated with React state, using conditional class names.

4. **Message Ordering**: Sorting contacts by their last message timestamp while also maintaining the correct order during real-time updates required `useMemo` optimization.

5. **Emoji Picker UX**: Building a keyboard-accessible emoji picker that correctly closes on outside clicks and inserts emojis at the cursor position.

---

## ⚛️ React Concepts Used

### React Hooks

| Hook | Where Used | Purpose |
|------|-----------|---------|
| `useState` | `MessageInput.tsx`, `ChatWindow.tsx` | Managing local component state (input text, emoji picker visibility, dropdown) |
| `useEffect` | `useLocalStorage.ts`, `MessageInput.tsx`, `ChatWindow.tsx` | Side effects: localStorage sync, auto-scroll, textarea resize, click-outside handlers |
| `useMemo` | `ChatContext.tsx`, `ContactList.tsx`, `ChatWindow.tsx` | Memoizing expensive computations: filtered contacts, sorted contact list, active messages |
| `useReducer` | `ChatContext.tsx` | Complex state management for chat actions (send, receive, delete, search, mark-read) |
| `useRef` | `MessageInput.tsx`, `ChatWindow.tsx` | DOM references for textarea auto-resize, scroll-to-bottom, outside-click detection |
| `useCallback` | `ChatContext.tsx`, `MessageInput.tsx` | Memoizing event handlers to prevent unnecessary child re-renders |

### React Context

**File**: `src/context/ChatContext.tsx`

The `ChatContext` provides global state management for the entire application:
- **State**: Messages, contacts, active contact, search query
- **Actions**: Send message, receive message, set active contact, delete chat, search
- **Computed Values**: Filtered contacts, active contact object, last message, unread counts

**Usage**: Components consume context via the custom `useChat()` hook, which provides type-safe access to all chat state and actions.

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useLocalStorage` | `src/hooks/useLocalStorage.ts` | Generic hook for persisting any state to localStorage with automatic JSON serialization/deserialization and error handling. Supports lazy initialization. |
| `useDebounce` | `src/hooks/useDebounce.ts` | Debounces rapidly changing values (search input) by a configurable delay to avoid excessive filtering. |
| `useAutoReply` | `src/hooks/useDebounce.ts` | Simulates contact auto-replies with random messages and random delays (1-4s). Manages timeout cleanup on unmount. |
| `useChat` | `src/context/ChatContext.tsx` | Context consumer hook providing type-safe access to chat state, actions, and computed values. |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactList.tsx    # Sidebar with contact list & search
│   ├── ContactList.css
│   ├── ChatWindow.tsx     # Main chat area with messages
│   ├── ChatWindow.css
│   ├── Message.tsx        # Individual message bubble
│   ├── Message.css
│   ├── MessageInput.tsx   # Message composer with emoji picker
│   └── MessageInput.css
├── context/
│   └── ChatContext.tsx    # Global state (Context + useReducer)
├── hooks/
│   ├── useLocalStorage.ts # Custom hook for localStorage
│   └── useDebounce.ts     # Debounce & auto-reply hooks
├── data/
│   └── contacts.ts        # Sample contacts & messages
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Root component
├── main.tsx               # Entry point
└── index.css              # Global styles & CSS variables
```

---

## ✨ Features

- ✅ Contact list with avatars, online status, and last messages
- ✅ Real-time chat with message bubbles and read receipts
- ✅ Emoji picker for quick reactions
- ✅ Search contacts by name or phone number
- ✅ Auto-reply simulation from contacts
- ✅ Message persistence via localStorage
- ✅ Unread message badges with count
- ✅ Delete chat functionality
- ✅ Responsive mobile-first design
- ✅ Smooth animations and transitions
- ✅ Keyboard accessible (Enter to send, Shift+Enter for new line)

---

## 📜 License

This project is built as part of an internship assignment to demonstrate React.js fundamentals including hooks, context, custom hooks, and browser storage APIs.
