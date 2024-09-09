import IdGenerator from "@/utils/IdGenerator";
import { IScore, CreateScore } from "@/types/IScore";

const scoresKey = 'saved_scores';
const savedScores = localStorage.getItem(scoresKey);

let scores: IScore[];

if (savedScores) {
  scores = JSON.parse(savedScores);
} else {
  scores = [];
}

const idGenerator = IdGenerator.Instance;

export const getAllScores = async (): Promise<IScore[]> => {
  localStorage.setItem(scoresKey, JSON.stringify(scores));
  
  return scores;
}

export const addScore = async (createScore: CreateScore): Promise<IScore> => {
  const score: IScore = {
    id: idGenerator.getId(),
    ...createScore,
  }
  scores.push(score);

  return score;
}

export const deleteAllScores = async (): Promise<void> => {
  scores = [];
  idGenerator.resetId();
}