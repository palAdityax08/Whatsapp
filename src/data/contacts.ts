import { Contact } from '../types';

// ============================================
// Sample Contacts Data
// ============================================

export const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    avatar: '',
    status: '🌟 Living my best life!',
    lastSeen: '2 min ago',
    isOnline: true,
    phone: '+91 98765-43210',
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: '',
    status: '💻 Coding all day...',
    lastSeen: '15 min ago',
    isOnline: true,
    phone: '+91 98765-43211',
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    avatar: '',
    status: '🎵 Music is life',
    lastSeen: '1 hour ago',
    isOnline: false,
    phone: '+91 98765-43212',
  },
  {
    id: '4',
    name: 'Ananya Singh',
    avatar: '',
    status: '⚡ Working on a new project',
    lastSeen: '30 min ago',
    isOnline: true,
    phone: '+91 98765-43213',
  },
  {
    id: '5',
    name: 'Vikram Malhotra',
    avatar: '',
    status: '🚀 Next JS is awesome!',
    lastSeen: '3 hours ago',
    isOnline: false,
    phone: '+91 98765-43214',
  },
  {
    id: '6',
    name: 'Neha Gupta',
    avatar: '',
    status: '☕ Need coffee...',
    lastSeen: '5 min ago',
    isOnline: true,
    phone: '+91 98765-43215',
  },
  {
    id: '7',
    name: 'Rohan Desai',
    avatar: '',
    status: '🎬 Binge watching movies',
    lastSeen: 'Yesterday',
    isOnline: false,
    phone: '+91 98765-43216',
  },
  {
    id: '8',
    name: 'Kavya Joshi',
    avatar: '',
    status: '✨ Exploring the world',
    lastSeen: '10 min ago',
    isOnline: true,
    phone: '+91 98765-43217',
  },
  {
    id: '9',
    name: 'Aditya Pal',
    avatar: '',
    status: '🔥 Building the ultimate God Mode Web App',
    lastSeen: 'Just now',
    isOnline: true,
    phone: '+91 98765-43218',
  },
  {
    id: '10',
    name: 'Sneha Reddy',
    avatar: '',
    status: '😊 Pretty happy',
    lastSeen: '20 min ago',
    isOnline: true,
    phone: '+91 98765-43219',
  },
];

// Initial messages for demonstration
export const initialMessages: Record<string, { text: string; sender: 'user' | 'contact' }[]> = {
  '1': [
    { text: 'Bhai, kaisa hai?', sender: 'contact' },
    { text: "Sab badhiya bhai, tu suna?", sender: 'user' },
    { text: 'Bas chal raha hai. React project finish kiya?', sender: 'contact' },
    { text: 'Almost done! Chat feature pe kaam kar raha hu abhi', sender: 'user' },
    { text: "Mast lag raha hai! Jaldi dikha", sender: 'contact' },
  ],
  '2': [
    { text: 'Hey, check this out!', sender: 'contact' },
    { text: 'Kya hai? 👀', sender: 'user' },
    { text: 'New UI component library mili hai, looks insane 🔥', sender: 'contact' },
    { text: 'Send the link, dekhte hai', sender: 'user' },
  ],
  '4': [
    { text: 'Meeting hai 3pm ko, yaad hai na?', sender: 'contact' },
    { text: "Haan, I'll be there on time", sender: 'user' },
    { text: 'Okay, design mockups ready rakhna please', sender: 'contact' },
  ],
  '6': [
    { text: "Naya Arijit Singh ka gaana suna? 🎵", sender: 'contact' },
    { text: "Nahi yaar! Send me the Spotify link", sender: 'user' },
    { text: "Bhejti hu, it's beautiful ✨", sender: 'contact' },
  ],
  '8': [
    { text: 'Goa trip confirm karna hai! 🏖️', sender: 'contact' },
    { text: "Main toh ready hu!", sender: 'user' },
    { text: 'Perfect! Tickets book kar du?', sender: 'contact' },
    { text: "Haan kar de, I'll Gpay you the amount", sender: 'user' },
    { text: 'Done! 🙌', sender: 'contact' },
  ],
  '9': [
    { text: 'The God Mode app is looking insane!', sender: 'contact' },
    { text: "Thanks bro, putting some final touches", sender: 'user' },
    { text: "Can't wait for the deployment 🚀", sender: 'contact' },
  ],
  '10': [
    { text: 'Happy birthday! 🎂', sender: 'user' },
    { text: 'Thank you so much Aditya!! 💖', sender: 'contact' },
    { text: 'Party kab de rahi hai? 😉', sender: 'user' },
    { text: 'Haha, iss weekend! Plan karte hai', sender: 'contact' },
  ],
};
