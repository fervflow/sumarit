export interface IScore {
    id: string;
    operation: string;
    result: number;
    answer: number | null;
    feedback: boolean;
}

export type CreateScore = Omit<IScore, 'id'>;