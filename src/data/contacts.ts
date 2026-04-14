import { Contact } from '../types';

// ============================================
// Sample Contacts Data
// ============================================

export const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '',
    status: '🌟 Living my best life!',
    lastSeen: '2 min ago',
    isOnline: true,
    phone: '+1 234-567-8901',
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: '',
    status: '💻 Coding all day...',
    lastSeen: '15 min ago',
    isOnline: true,
    phone: '+1 234-567-8902',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: '',
    status: '🎵 Music is life',
    lastSeen: '1 hour ago',
    isOnline: false,
    phone: '+1 234-567-8903',
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatar: '',
    status: '⚡ Wonder Woman vibes',
    lastSeen: '30 min ago',
    isOnline: true,
    phone: '+1 234-567-8904',
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    avatar: '',
    status: '🕵️ Mission possible',
    lastSeen: '3 hours ago',
    isOnline: false,
    phone: '+1 234-567-8905',
  },
  {
    id: '6',
    name: 'Fiona Apple',
    avatar: '',
    status: '🎤 New album soon!',
    lastSeen: '5 min ago',
    isOnline: true,
    phone: '+1 234-567-8906',
  },
  {
    id: '7',
    name: 'George Lucas',
    avatar: '',
    status: '🎬 Creating worlds',
    lastSeen: 'Yesterday',
    isOnline: false,
    phone: '+1 234-567-8907',
  },
  {
    id: '8',
    name: 'Hannah Montana',
    avatar: '',
    status: '🎶 Best of both worlds',
    lastSeen: '10 min ago',
    isOnline: true,
    phone: '+1 234-567-8908',
  },
  {
    id: '9',
    name: 'Ivan Drago',
    avatar: '',
    status: '💪 Training hard',
    lastSeen: '2 days ago',
    isOnline: false,
    phone: '+1 234-567-8909',
  },
  {
    id: '10',
    name: 'Julia Roberts',
    avatar: '',
    status: '😊 Pretty happy',
    lastSeen: '20 min ago',
    isOnline: true,
    phone: '+1 234-567-8910',
  },
];

// Initial messages for demonstration
export const initialMessages: Record<string, { text: string; sender: 'user' | 'contact' }[]> = {
  '1': [
    { text: 'Hey! How are you doing?', sender: 'contact' },
    { text: "I'm great! Thanks for asking 😊", sender: 'user' },
    { text: 'Did you finish the React project?', sender: 'contact' },
    { text: 'Almost done! Working on the chat feature now', sender: 'user' },
    { text: "That's awesome! Can't wait to see it", sender: 'contact' },
  ],
  '2': [
    { text: 'Bro, check this out!', sender: 'contact' },
    { text: 'What is it? 👀', sender: 'user' },
    { text: 'New JavaScript framework just dropped 😂', sender: 'contact' },
    { text: 'Oh no, not another one!', sender: 'user' },
  ],
  '4': [
    { text: 'Meeting at 3pm today', sender: 'contact' },
    { text: "Got it! I'll be there", sender: 'user' },
    { text: 'Bring the design mockups please', sender: 'contact' },
  ],
  '6': [
    { text: "Have you heard the new song? 🎵", sender: 'contact' },
    { text: "Not yet! Send me the link", sender: 'user' },
  ],
  '8': [
    { text: 'Party this weekend? 🎉', sender: 'contact' },
    { text: "Count me in!", sender: 'user' },
    { text: 'Perfect! Bring snacks 🍕', sender: 'contact' },
    { text: "I'll bring pizza!", sender: 'user' },
    { text: 'Best decision ever 🙌', sender: 'contact' },
  ],
  '10': [
    { text: 'Happy birthday! 🎂', sender: 'user' },
    { text: 'Thank you so much!! 💖', sender: 'contact' },
  ],
};
