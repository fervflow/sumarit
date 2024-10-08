"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IScore } from '@/types/IScore'
import Score from './Score';
import { useApiContext } from '../contexts/ApiContext';

const ListScores:React.FC = () => {
  const [scores, setScores] = useState<IScore[]>([]);

  const api = useApiContext();

  const [showAlert, setShowAlert] = useState(false);
  const [alertDeleteOrReload, setAlertDeleteOrReload] = useState(true); //1: delete, 0: reload

  const ShowAlert = useCallback(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }, []);

  const fetchScores = useCallback(async () => {
    if (!api) {console.log('ListScores: No API yet'); return;}
    const fetchedScores = await api.getAllScores();
    setScores(fetchedScores);
  }, [api]);

  useEffect(() => {
      fetchScores();
  }, [fetchScores]);

  const totalAnswers = useMemo(() => scores.length, [scores]);
  const correctAnswers = useMemo(() => {    
    return scores.reduce(
      (sum, score) => sum + (score["feedback"] ? 1 : 0), 0);
  }, [scores]);

  const reloadSores = useCallback(async () => {
    if (!api) return;
    fetchScores();
    setAlertDeleteOrReload(false);
    ShowAlert();
  }, [api, fetchScores, ShowAlert]);

  const deleteSores = useCallback(async () => {
    if (!api) return;
    await api.deleteAllScores();
    setAlertDeleteOrReload(true);
    ShowAlert();
    fetchScores();
  }, [api, fetchScores, ShowAlert]);

  return (
    <>
    {scores.length > 0 ? (
      <div className='overflow-scroll w-11/12 sm:w-9/12 md:w-[650px] min-w-[440px] bg-base-300 rounded-2xl border-2 border-neutral'>
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
                Correctas: <span className='text-success'>{correctAnswers}</span> &emsp;
                Incorrectas: <span className='text-error'>{totalAnswers - correctAnswers}</span> &emsp;
                Puntaje : <span className='text-accent'>
                {Math.round(correctAnswers*100/totalAnswers*10)/10} / 100
              </span>
              </th>
            </tr>
          </tfoot>
        </table>
        <div className='flex flex-row justify-between px-4 bg-base-300'>
          <button
            className="btn btn-sm btn-link hover:text-error decoration-wavy no-underline"
            onClick={
              () => (document.getElementById('modal_delete_scores') as HTMLDialogElement).showModal()
            }
          >
            Borrar Resultados
          </button>
          <dialog className="modal" id="modal_delete_scores">
            <div className="modal-box">
              <h3 className='font-bold text-error'>¿Estás seguro?</h3>
              <p className="text-base">
                Se eliminará tu progreso... &nbsp;
              </p>
              <div className="modal-action items-center">
                <form method='dialog'>
                  <button
                    className="btn btn-link text-error decoration-wavy no-underline"
                    onClick={deleteSores}
                  >
                    Borrar Resultados
                  </button>
                </form>
                <form method="dialog">
                  <button className="btn btn-sm btn-secondary">Cancelar</button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <button
            className='btn btn-sm btn-link decoration-wavy no-underline'
            onClick={reloadSores}
          >
            Recargar Resultados
          </button>
        </div>
      </div>
    ) : (
      <div className='text-center'>
        ¡Juega un poco para ver tus resultados!
      </div>
    )}
    {
      showAlert &&
      <div role="alert" className={`alert ${alertDeleteOrReload ? 'alert-warning':'alert-success'} flex items-center w-fit transition duration-1000 ease-in-out`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={`${alertDeleteOrReload
                ? "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}
              `}
          ></path>
        </svg>
        <span>Los resultados fueron {alertDeleteOrReload ? 'eliminados' : 'recargados'}.</span>
      </div>
    }
    </>
  )
}

export default ListScores