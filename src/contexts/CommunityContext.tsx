// src/contexts/CommunityContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

// Define the shape of the context data
interface ICommunityContext {
  communityId: string | null;
  setCommunityId: (id: string | null) => void;
  communityImg: string | null;
  setCommunityImg: (id: string | null) => void;
}

// Create the context with a default value
const CommunityContext = createContext<ICommunityContext | undefined>(
  undefined
);

// Create a provider component
export const CommunityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [communityImg, setCommunityImg] = useState<string | null>(null);

  // useMemo ensures the context value object is only recreated when communityId changes
  const value = useMemo(
    () => ({ communityId, setCommunityId, communityImg, setCommunityImg }),
    [communityId]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
