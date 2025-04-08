// Method decorator to measure execution time
function measureTime() {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const start = performance.now();
			const result = originalMethod.apply(this, args);
			const end = performance.now();

			console.log(
				`Method ${propertyKey} took ${(end - start).toFixed(2)}ms to execute`
			);
			return result;
		};

		return descriptor;
	};
}

// Example class using the decorator
class Calculator {
	@measureTime()
	add(a: number, b: number): number {
		// Simulate some computation
		for (let i = 0; i < 1000000; i++) {}
		return a + b;
	}

	@measureTime()
	multiply(a: number, b: number): number {
		// Simulate some computation
		for (let i = 0; i < 1000000; i++) {}
		return a * b;
	}
}

// Example usage
const calculator = new Calculator();
console.log(calculator.add(5, 3)); // Will log execution time and return 8
console.log(calculator.multiply(4, 6)); // Will log execution time and return 24
