"use client";

import { IScore, CreateScore } from "@/types/IScore"
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

type API = {
  getAllScores: () => Promise<IScore[]>;
  addScore: (score: CreateScore) => Promise<IScore>;
  deleteAllScores: () => Promise<void>;
}

const ApiContext = createContext<API | null>(null);


export function useApiContext(): API {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
}
// interface ApiProviderProps {
//   children: ReactNode;
// }

// async function loadApi(): Promise<API> {
//   try {
//     const realApi = await import('@/api/api');
//     await realApi.getAllScores(); // Optional: Test the API connection
//     console.log('JSON Server API imported?');
    
//     return realApi;
//   } catch (error) {
//     const fakeApi = await import('@/api/api_fake');
//     console.log('FAKE API imported!!!');
//     return fakeApi;
//   }
// }

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<API | null>(null);

  // }, []);
  // useEffect(() => {
  //   loadApi().then(setApi);
  // }, []);
  useEffect(() => {
    const loadApi = async () => {
      try {
        const realApi = await import('@/api/api');
        await realApi.getAllScores();
        setApi(realApi);
        console.log('JSON Server API imported');
      } catch (error) {
        const fakeApi = await import('@/api/api_fake');
        setApi(fakeApi);
        console.log('FAKE API imported!!!');
      }
    }
    loadApi();
  }, []);

  if (!api) {
    return null;
  }
  
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

