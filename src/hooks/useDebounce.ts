import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================
// Custom Hook: useDebounce
// ============================================
// Debounces a value by the specified delay.
// Useful for search input to avoid filtering on every keystroke.

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// Custom Hook: useAutoReply
// ============================================
// Simulates auto-replies from contacts after a delay.

export function useAutoReply(onReply: (contactId: string, text: string) => void) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const replies = [
    "That's interesting! Tell me more 🤔",
    "Haha, good one! 😂",
    "I totally agree with you! 👍",
    "Let me think about that... 🤔",
    "Sounds great! 🎉",
    "Oh wow, really? 😮",
    "Thanks for letting me know! 🙏",
    "I was just thinking the same thing! 💭",
    "Can we discuss this later? 📞",
    "You're absolutely right! ✅",
    "That makes sense! 💡",
    "No way! Are you serious? 😱",
    "I'll get back to you on that 📝",
    "Love it! Send me more details 💖",
    "Cool cool cool! 😎",
  ];

  const triggerAutoReply = useCallback((contactId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const delay = 1000 + Math.random() * 3000; // 1-4 seconds delay
    timeoutRef.current = setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      onReply(contactId, randomReply);
    }, delay);
  }, [onReply]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return triggerAutoReply;
}
