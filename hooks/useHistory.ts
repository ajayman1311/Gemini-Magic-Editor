import { useState, useCallback } from 'react';

export const useHistory = <T,>(initialState: T) => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const setState = useCallback((newState: T, overwrite = false) => {
    if (overwrite) {
      const newHistory = [...history];
      newHistory[currentIndex] = newState;
      setHistory(newHistory);
    } else {
      const newHistory = history.slice(0, currentIndex + 1);
      setHistory([...newHistory, newState]);
      setCurrentIndex(newHistory.length);
    }
  }, [currentIndex, history]);
  
  const resetState = useCallback((newState: T) => {
    setHistory([newState]);
    setCurrentIndex(0);
  }, []);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, history.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { state, setState, resetState, undo, redo, canUndo, canRedo };
};