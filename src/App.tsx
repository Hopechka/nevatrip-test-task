import React from 'react';
import { Card } from './components/Card/Card';
import { tours } from './data/tours';

function App() {
  return (
    <div
      className='min-w-[375px] px-4 py-7 mx-auto  
    md:max-w-[1440px] bg-white md:py-[68px]'
    >
      {tours.map((tour) => (
        <Card tour={tour} key={tour.id} />
      ))}
    </div>
  );
}

export default App;
