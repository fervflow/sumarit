"use client"

import React from 'react';
import { IScore } from '@/types/IScore';

interface iScore {
  score: IScore;
}

const Score:React.FC<iScore> = ({score}) => {
  return (
    <tr key={score.id} className='font-mono leading-none'>
      <td className=''>{score.operation}</td>
      <td className=''>{score.result}</td>
      <td className=''>{
          score.answer === null ? '-' : score.answer
        }
      </td>
      <td
        className={`
          leading-3 text-2xl
          ${score.result === score.answer
            ? 'text-success'
            :'text-error'
          }
        `}
      >{score.feedback ? "✔" : '✘'}</td>
    </tr>
  );
}

export default Score;