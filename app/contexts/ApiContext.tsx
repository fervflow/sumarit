"use client";

import { IScore, CreateScore } from "@/types/IScore"
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

type API = {
  getAllScores: () => Promise<IScore[]>;
  addScore: (score: CreateScore) => Promise<IScore>;
  deleteAllScores: () => Promise<void>;
}

const ApiContext = createContext<API | null>(null);

interface ApiProviderProps {
  children: ReactNode;
}
export default function ApiContextProvider({ children }: ApiProviderProps) {
  const [api, setApi] = useState<API | null>(null);

  useEffect(() => {
    const loadApi = async () => {
      try {
        const realApi = await import('@/api/api');
        await realApi.getAllScores();
        setApi(realApi);
      } catch (error) {
        const fakeApi = await import('@/api/api_fake');
        setApi(fakeApi);
      }
    }

    if (api == null) {
      loadApi();
    }
  }, [api]);

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
}