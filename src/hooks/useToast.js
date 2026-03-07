import { useState, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null); // { message, id }

  const showToast = useCallback((message) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  return { toast, showToast, hideToast };
}
