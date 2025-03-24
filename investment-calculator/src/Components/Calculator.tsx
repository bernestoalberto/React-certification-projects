import { InvestmentParameters } from '../util/investment';


function Calculator({ onChange, formData }: { onChange: (identifier: string, data: string) => void, formData: InvestmentParameters }) {

  return (
    <>
      <form id='user-input'>
        <div className="input-group">
          <p>
            <label htmlFor="initial-investment">Initial Investment</label>
            <input
              type="number"
              id="initial-investment"
              name="initialInvestment"
              value={formData.initialInvestment}
              onChange={(event) =>
                onChange('initialInvestment', event.target.value)
              }
              required
            />
          </p>
          <p>
            <label htmlFor="annual-investment">Annual Investment</label>
            <input
              type="number"
              id="annual-investment"
              name="annualInvestment"
              value={formData.annualInvestment}
              onChange={(event) =>
                onChange('annualInvestment', event.target.value)
              }
              required
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Return
            </label>
            <input
              type="number"
              id="expected-return"
              name="expectedReturn"
              value={formData.expectedReturn}
              onChange={(event) =>
                onChange('expectedReturn', event.target.value)
              }
              required
            />
          </p>
          <p>
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={(event) => onChange('duration', event.target.value)}
              required
            />
          </p>
        </div>
      </form>
    </>
  );
};

export default Calculator;
