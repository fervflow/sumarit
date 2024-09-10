"use client";

import { useState, useEffect, useCallback } from 'react';
import { generateOperation } from '@/utils/utils';
import { CreateScore } from '@/types/IScore';
import { useApiContext } from '../contexts/ApiContext';

const DEFAULT_TIME = 15;

const PlayTimer = () => {
  const [timer, setTimer] = useState(DEFAULT_TIME);
  const [operation, setOperation] = useState(generateOperation());
  const [answer, setAnswer] = useState<string>('');

  const api = useApiContext();
  
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleAnswerInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const answerInput = event.target.value;
    if (/^-?\d*$/.test(answerInput)) {
      setAnswer(answerInput);
    }
  }, []);
  
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    if (!api) return;
    if (event) event.preventDefault();

    const scoreData: CreateScore = {
      operation: `${operation.a} ${operation.operator} ${operation.b}`,
      result: operation.result,
      answer: answer === '' ? null : Number(answer),
      feedback: answer !== '' && Number(answer) === operation.result,
    };
    
    await api.addScore(scoreData);
    
    setTimer(DEFAULT_TIME);
    setOperation(generateOperation());
    setAnswer('');
  }, [operation, answer, api]);
  
  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
  }, [handleSubmit, timer]);

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center gap-4 font-bold text-3xl text-base-content' >
      <h3 className='text-lg'>Tiempo restante:</h3>
      <span
        className={timer > 3 ? 'text-secondary': 'text-warning'} >
        {timer} seg.
      </span>
      <h3 className='text-lg'>Operación:</h3>
      <div className='flex gap-5 font-mono'>
        {`${operation.a} ${operation.operator} ${operation.b}`}
      </div>
      <h4 className='text-lg'>Respuesta:</h4>
      <div>
        <input
          className="input input-bordered border-2 input-accent text-3xl font-mono w-36 max-w-xs"
          type="text"
          inputMode='numeric'
          pattern='-?\d*'
          maxLength={5}
          value={answer}
          onChange={handleAnswerInput} />
      </div>
      <button type='submit' className='btn btn-accent'>
        Enviar Respuesta
      </button>
    </form>
  );
};

export default PlayTimer;