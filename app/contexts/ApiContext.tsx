"use client";

import { IScore, CreateScore } from "@/types/IScore"
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

type API = {
  getAllScores: () => Promise<IScore[]>;
  addScore: (score: CreateScore) => Promise<IScore>;
  deleteAllScores: () => Promise<void>;
}

const ApiContext = createContext<API | null>(null);

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<API | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      try {
        setLoading(true);
        const realApi = await import('@/api/api');
        await realApi.getAllScores();
        setApi(realApi);
        console.log('JSON Server API imported');
      } catch (error) {
        const fakeApi = await import('@/api/api_fake');
        setApi(fakeApi);
        console.log('FAKE API imported');
      } finally {
        setLoading(false);
      }
    }
    loadApi();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-8 font-bold'>
        Cargando resultados &nbsp;
        <span className="loading loading-dots loading-md text-secondary"></span>
      </div>
    );
  }

  if (!api) {
    return null;
  }
  
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext(): API {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
}