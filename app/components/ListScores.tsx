"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IScore } from '@/types/IScore'
import Score from './Score';
import { useApiContext } from '../contexts/ApiContext';

const ListScores:React.FC = () => {
  // const [api, isLoading] = useAPI();
  const [scores, setScores] = useState<IScore[]>([]);
  // const [shouldFetch, setShouldFetch] = useState(true);

  const api = useApiContext();

  const fetchScores = useCallback(async () => {
    if (!api) return;
    const fetchedScores = await api.getAllScores();
    setScores(fetchedScores);
    // setShouldFetch(false);
  }, [api]);

  useEffect(() => {
    // if (!isLoading && shouldFetch) {
      fetchScores();
    // }
  // }, [isLoading, shouldFetch, fetchScores]);
  }, [fetchScores]);

  const totalAnswers = useMemo(() => scores.length, [scores]);
  const correctAnswers = useMemo(() => {
    return scores.reduce(
      (sum, score) => sum + (score["feedback"] ? 1 : 0), 0);
  }, [scores]);
  
  // if (isLoading) return <div>Cargando resultados...</div>;

  return (
    <div className='overflow-scroll w-11/12 sm:w-9/12 md:w-[650px] min-w-[440px] bg-base-300 rounded-2xl border-2 border-neutral'>
      {scores.length > 0 ? (
      <table className="table table-pin-rows z-0 table-zebra text-center">
        <thead>
          <tr>
            <th className='w-3/12'>Operación</th>
            <th className='w-2/12'>Resultado</th>
            <th className='w-2/12'>Respuesta</th>
            <th className='w-2/12'>Feedback</th>
          </tr>
        </thead>
        <tbody>{
          scores.map((score) => (
            <Score
              key={score.id}
              score={score}
            ></Score>
          ))
        }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4}>
              Total: {totalAnswers} &emsp;
              Correctas: {correctAnswers} &emsp;
              Incorrectas: {totalAnswers - correctAnswers} &emsp;
            <span className='text-accent'>
              Puntaje : {Math.round(correctAnswers*100/totalAnswers*10)/10} / 100
            </span>
            </th>
          </tr>
        </tfoot>
      </table>
      ) : (
        <div className='text-center'>
          ¡Juega un poco para ver tus resultados!
        </div>
      )}
    </div>
  )
}

export default ListScores