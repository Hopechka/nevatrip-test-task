import * as React from 'react';
import { ITours } from '../../types/types';

import Clock from '../../assets/svg/clock.svg';
import Checked from '../../assets/svg/checked.svg';

import { useState } from 'react';
import './Card.css';

interface ICardProps {
  tour: ITours;
}

export function Card({ tour }: ICardProps) {
  const description = tour.description;
  const schedule = tour.schedule;
  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);

  return (
    <div className='w-full flex-col rounded-2xl border-solid border-[0.3px] border-b-grey mb-[30px]'>
      <div
        className='w-full h-56 rounded-t-2xl'
        style={{
          backgroundImage: `url(${require(`../../assets/images/${tour.image}.png`)})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className='px-3 h-auto'>
        <div className='py-3 flex gap-x-2 '>
          <img className='w-4 h-4 self-center' src={Clock} alt='clock' />
          <p className='text-regal-grey'>{tour.duration}</p>
        </div>

        <h2 className='font-semibold leading-6 pb-3'>{tour.title}</h2>

        <ul>
          {description.map((item) => (
            <li
              className='text-description-grey leading-5 pl-9 pb-3'
              style={{
                backgroundImage: `url(${Checked})`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className={!isTimeOpen ? 'timeMenu close' : 'timeMenu open'}>
          {schedule.map((time, index, arr) => (
            <div className='leading-5 text-time-grey bg-time-bg rounded-xl w-[64px] h-6 text-center pt-[3px]'>
              {arr.length <= 4 || isTimeOpen ? (
                time
              ) : index === 3 ? (
                <div
                  className='cursor-pointer hover:opacity-70'
                  onClick={() => setIsTimeOpen((prev) => !prev)}
                  onKeyPress={() => setIsTimeOpen((prev) => !prev)}
                >
                  ещё..
                </div>
              ) : (
                time
              )}
            </div>
          ))}
        </div>
      <div className='flex justify-between mt-9 mb-6 px-5 items-center'>
          <div>
            <p className='text-3xl'>{tour.price} &#8381;</p>
            {tour.details && <p className='text-[10px]'>{tour.details}</p>}
          </div>
          <button
          className='w-48 h-11 bg-btn-bg rounded-xl border-solid border-[0.5px] border-btn-border'
          >
            <span className='cursor-pointer hover:font-semibold'>Подробнее</span>
          </button>
        </div>
    </div>
  );
}
