import { CreateScore, IScore } from "@/types/IScore"
import { useCallback, useEffect, useState } from "react";

const isBackendAvailable = async (): Promise<boolean> => {
    try {
        const res = await fetch('http://localhost:3030/resultados');
        return res.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}

type API = {
    getAllScores: () => Promise<IScore[]>;
    addScore: (score: CreateScore) => Promise<IScore>;
    deleteAllScores: () => Promise<void>;
}

const useAPI = (): [API | null, boolean] => {
    const [api, setApi] = useState<API | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const memoBackend = useCallback(async () => {
        const result = await isBackendAvailable();
        return result;
    }, []);

    useEffect(() => {
        const loadApi = async () => {
            const backendAvailable = await memoBackend();
            let apiModule;
            if (backendAvailable) {
                apiModule = await import('@/api/api');
            } else {
                apiModule = await import('@/api/api_fake');
            }
            setApi(apiModule);
            setIsLoading(false);
        };
        loadApi();
    }, [memoBackend]);

    return [api, isLoading];
}

export { isBackendAvailable, useAPI };