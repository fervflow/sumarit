"use client";

import { themes } from '@/constants/themes-list'
import React, { useEffect } from 'react'
import { themeChange } from 'theme-change';

const ThemesList: React.FC = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
    {themes.map((theme, index) => (
      <li key={index}>
        <button
          type='button'
          name='theme-dropdown'
          className="theme-controller flex justify-between btn btn-sm btn-block btn-ghost"
          aria-label={theme}
          data-set-theme={theme}
          data-act-class="ACTIVECLASS"
        >
          {theme}
          <div data-theme={theme} className='flex items-center gap-1 bg-transparent'>
            <div className='rounded-full size-4 bg-base-100 border-2 border-primary'></div>
            <div className='rounded-full size-4 bg-secondary border-2 border-accent'></div>
            <div className='rounded-full size-4 bg-neutral border-2 border-neutral-content'></div>
          </div>
        </button>
      </li>
    ))}
    </>
  );
}

export default ThemesList