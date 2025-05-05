import { useState } from 'react';

import Counter from './components/Counter/Counter.tsx';
import Header from './components/Header.tsx';
import { log } from './log.ts';
import ConfigureCounter from './components/Counter/ConfigureCounter.tsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    setChosenCount((prevChosenCount) => prevChosenCount + 1);
    console.log(chosenCount); // won't work!
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
