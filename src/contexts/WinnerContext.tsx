import React, { createContext, useState } from 'react';

interface ISeasonContext {
  winnerId: string;
  setWinnerId: React.Dispatch<React.SetStateAction<string>>;
}

export const SeasonWinnerContext = createContext<ISeasonContext>({} as ISeasonContext);

export default function WinnerContext({ children }: { children: React.ReactNode }) {
  const [winnerId, setWinnerId] = useState('');
  return <SeasonWinnerContext.Provider value={{ winnerId, setWinnerId }}>{children}</SeasonWinnerContext.Provider>;
}
