'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useMoodEngine, MoodMode } from '@/hooks/useMoodEngine';

const MoodContext = createContext<MoodMode>('MIDDAY_FULL');

export function useMood() {
  return useContext(MoodContext);
}

export function MoodProvider({ children }: { children: ReactNode }) {
  const mood = useMoodEngine();

  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
  }, [mood]);

  return (
    <MoodContext.Provider value={mood}>
      {children}
    </MoodContext.Provider>
  );
}
