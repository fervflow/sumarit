import IdGenerator from "@/app/lib/IdGenerator";
import { IScore, CreateScore } from "@/types/IScore";

const url_db = 'http://localhost:3030'
const idGenerator = IdGenerator.Instance;

export const getAllScores = async(): Promise<IScore[]> => {
    try {
        const res = await fetch(`${url_db}/resultados`);
        if (!res.ok) {
            throw new Error(`HTTP error. Status: ${res.status}`)
        }
        const scores = await res.json();
        return scores;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

export const addScore = async (createScore: CreateScore): Promise<IScore> => {
    const score: IScore = {
        id: idGenerator.getId(),
        ...createScore
    };
    const res = await fetch(`${url_db}/resultados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
    })
    const newScore = await res.json()

    return newScore;
}

const deleteScore = async (id: number): Promise<void> => {
    const res = await fetch(`${url_db}/resultados/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        throw new Error(`Failed to delete score with id: ${id}`)
    }
}

export const deleteAllScores = async (): Promise<void> => {
    const scores = await getAllScores();
    const deletePromises = scores.map(score => deleteScore(score.id!));
    await Promise.all(deletePromises);
    idGenerator.resetId();
}