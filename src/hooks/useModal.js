import { useState, useCallback } from 'react';

export function useModal() {
  const [isOpen,           setIsOpen]           = useState(false);
  const [mode,             setMode]             = useState('create');
  const [editingCountdown, setEditingCountdown] = useState(null);

  const openCreate = useCallback(() => {
    setMode('create');
    setEditingCountdown(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((countdown) => {
    setMode('edit');
    setEditingCountdown(countdown);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clearing data so close animation can finish
    setTimeout(() => setEditingCountdown(null), 250);
  }, []);

  return { isOpen, mode, editingCountdown, openCreate, openEdit, close };
}
