import React from 'react';
import { Card } from './components/Card/Card';
import { tours } from './data/tours';

function App() {
  return (
    <div className='min-w-[375px] px-4 py-7 mx-auto  2xl:max-w-[1106px] 2xl:mt-16 bg-white'>
      {tours.map((tour) => (
        <Card tour={tour} key={tour.id} />
      ))}
    </div>
  );
}

export default App;
