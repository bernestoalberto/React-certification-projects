import Header from './components/Header/Header';
import './App.css';
import CoreConcepts from './components/CoreConcept/CoreConcepts';
import { Examples } from './components/Examples/Examples';

function App() {

  return (
    <>
     <Header />
       <main>
       <CoreConcepts />
       <Examples />
      </main>
    </>
  )
}

/**
 * The main component of the application.
 * Serves as the root component where the application's main layout and routing are defined.
 * 
 * @returns The rendered App component
 * @example
 * ```tsx
 * <App />
 * ```
 */
export default App
