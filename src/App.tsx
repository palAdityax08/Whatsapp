import React, { useCallback } from 'react';
import { ChatProvider, useChat } from './context/ChatContext';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import './index.css';

// ============================================
// AppContent Component
// ============================================
// Inner component that uses the ChatContext
// to manage responsive sidebar visibility.

const AppContent: React.FC = () => {
  const { activeContact } = useChat();

  return (
    <div className="app" id="whatsapp-app">
      <div className="app__container">
        <aside
          className={`app__sidebar ${activeContact ? 'app__sidebar--hidden' : ''}`}
          id="sidebar"
        >
          <ContactList />
        </aside>
        <main className="app__main" id="main-content">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
};

// ============================================
// App Component (Root)
// ============================================
// Wraps the application with ChatProvider
// for global state management via Context API.

const App: React.FC = () => {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
};

export default App;
