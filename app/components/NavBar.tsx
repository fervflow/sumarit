import Link from 'next/link'
import React from 'react'

import { GrScorecard } from "react-icons/gr";
import { GrPlay } from "react-icons/gr";
import ThemesList from './ThemesList';

const NavBar = () => {
  return (
    <nav>
      <div className="navbar justify-between bg-base-300 px-4">
        <div className="navbar-start">
          <a className="btn btn-link decoration-wavy no-underline text-primary text-xl brightness-1">
            SumArit
          </a>
        </div>
        <div className="navbar-center flex text-base-content">
          <ul className="menu menu-horizontal px-1  font-semibold">
            <li>
              <Link href="/" replace className='flex justify-center items-center gap-1'>
                <GrScorecard className='text-accent'/>
                Resultados
              </Link>
            </li>
            <li>
              <Link href="/play" replace className='flex justify-center items-center gap-1'>
                <GrPlay className='text-accent'/>
                Jugar
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-secondary btn-sm m-1">
              Colores
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-neutral text-neutral-content rounded-box z-[1] w-52 mt-1 p-2 shadow-2xl">
              <ThemesList></ThemesList>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar