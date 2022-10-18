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
    <div className='cardWrapper'>
      {tour.category && (
        <div
          className='flex justify-center items-center font-semibold 
        w-[99px] h-[35px] bg-btn-bg absolute text-center translate-y-full
      xl:w-[154px] xl:h-11 xl:text-lg '
        >
          {tour.category}
        </div>
      )}
      <div
        className='w-full h-56 rounded-t-2xl bg-cover bg-center bg-no-repeat
         md:rounded-t-none md:rounded-l-2xl md:max-w-[464px] md:h-auto'
        style={{
          backgroundImage: `url(${require(`../../assets/images/${tour.image}.png`)})`,
        }}
      ></div>
      <div className='md:flex md:flex-col md:pl-5 md:justify-between xl:relative'>
        <div className='px-3 h-auto md:flex md:flex-col md:px-0'>
          <div className='py-3 flex gap-x-2 md:pt-0 pb-2'>
            <img className='w-4 h-4 self-center' src={Clock} alt='clock' />
            <p className='text-regal-grey'>{tour.duration}</p>
          </div>

          <h2
            className='font-semibold leading-6 pb-3 
            lg:text-3xl lg:font-normal md:-order-1 md:pt-4'
          >
            {tour.title}
          </h2>
        </div>

        <ul className='px-3 h-auto md:px-0'>
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

        <div className={!isTimeOpen ? 'timeMenu close' : 'timeMenu open'}>
          {schedule.map((time, index, arr) => (
            <div
              className='leading-5 text-time-grey bg-time-bg 
            rounded-xl w-[64px] h-6 text-center pt-[3px]'
            >
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

        <div className={!isTimeOpen ? 'cardBottom' : 'cardBottom menuOpen'}>
          <div>
            <p className='text-3xl'>{tour.price} &#8381;</p>
            {tour.details && <p className='text-[10px]'>{tour.details}</p>}
          </div>
          <button
            className='w-48 h-11 bg-btn-bg rounded-xl border-solid
            border-[0.5px] border-btn-border cursor-pointer hover:font-semibold'
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}
