import { useState } from "react"
import Calculator from "./Components/Calculator"
import Header from "./Components/Header"
import ResultsTable from "./Components/ResultsTable"
import { InvestmentParameters } from "./util/investment";



function App() {
  const [formData, setFormData] = useState<InvestmentParameters>({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = formData.duration >= 1;

  function handleChange(inputIdentifier: any, newValue: any) {
    setFormData((prevUserInput: any) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  return (
    <>
      <Header title="Investment Calculator" subtitle="Calculate your future investments" />
      <Calculator onChange={handleChange} formData={formData} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <ResultsTable input={formData} />}
    </>
  )
}

export default App
