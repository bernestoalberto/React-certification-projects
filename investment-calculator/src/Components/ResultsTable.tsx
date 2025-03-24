import { calculateInvestmentResults, formatter } from '../util/investment.ts';
import { InvestmentParameters } from '../util/investment.ts';

export default function Results({ input }: { input: InvestmentParameters }) {
    const resultsData = calculateInvestmentResults(input);
    if (resultsData.length === 0) return null;

    const firstYearData = resultsData[0];
    if (!firstYearData) {
        return null;
    }
    const initialInvestment = (firstYearData.valueEndOfYear || 0) -
        (firstYearData.interest || 0) -
        (firstYearData.annualInvestment || 0);


    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {resultsData.map((yearData) => {
                    const totalInterest =
                        (yearData.valueEndOfYear ?? 0) -
                        (yearData.annualInvestment ?? 0) * (yearData.year ?? 0) -
                        initialInvestment;
                    const totalAmountInvested = (yearData.valueEndOfYear ?? 0) - totalInterest;

                    return (
                        <tr key={yearData.year}>
                            <td>{yearData.year}</td>
                            <td>{formatter.format(yearData.valueEndOfYear || 0)}</td>
                            <td>{formatter.format(yearData.interest || 0)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
