"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Method decorator to measure execution time
function measureTime() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const end = performance.now();
            console.log(`Method ${propertyKey} took ${(end - start).toFixed(2)}ms to execute`);
            return result;
        };
        return descriptor;
    };
}
// Example class using the decorator
class Calculator {
    add(a, b) {
        // Simulate some computation
        for (let i = 0; i < 1000000; i++) { }
        return a + b;
    }
    multiply(a, b) {
        // Simulate some computation
        for (let i = 0; i < 1000000; i++) { }
        return a * b;
    }
}
__decorate([
    measureTime(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "add", null);
__decorate([
    measureTime(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "multiply", null);
// Example usage
const calculator = new Calculator();
console.log(calculator.add(5, 3)); // Will log execution time and return 8
console.log(calculator.multiply(4, 6)); // Will log execution time and return 24
//# sourceMappingURL=timing-decorator.js.map