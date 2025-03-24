// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount
// - annualInvestment: The amount invested every year
// - expectedReturn: The expected (annual) rate of return
// - duration: The investment duration (time frame)
export interface InvestmentParameters {
	initialInvestment?: number;
	annualInvestment?: number;
	expectedReturn?: number;
	duration: number;
}
export interface ResultData {
	investedCapital: number;
	year?: number;
	interestEarnedInYear?: number;
	investmentValue: number;
	interest?: number;
	totalInterest?: number;
	annualInvestment?: number;
	valueEndOfYear?: number;
}

export const INITIAL_RESULT: ResultData = {
	year: 0,
	interestEarnedInYear: 0,
	investmentValue: 0,
	interest: 0,
	valueEndOfYear: 0,
	investedCapital: 0,
};

export function calculateInvestmentResults({
	initialInvestment,
	annualInvestment,
	expectedReturn,
	duration,
}: InvestmentParameters): Array<ResultData> {
	const annualData: Array<ResultData> = [];
	let investmentValue = initialInvestment;

	if (
		initialInvestment &&
		annualInvestment &&
		expectedReturn &&
		duration &&
		investmentValue
	) {
		for (let i = 0; i < duration; i++) {
			const interestEarnedInYear = investmentValue * (expectedReturn / 100);
			investmentValue += interestEarnedInYear + annualInvestment;
			annualData.push({
				year: i + 1,
				interest: interestEarnedInYear,
				valueEndOfYear: investmentValue,
				annualInvestment,
				interestEarnedInYear,
				investmentValue: 0,
				investedCapital: 0,
			});
		}
	}
	return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});
