import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
	counter: number;
	showCounter: boolean;
}

export const INCREMENT = "increment";
export const DECREMENT = "decrement";
export const INCREASE = "increase";
export const TOGGLE_COUNTER = "toggleCounter";

export interface CounterAction {
	type: string;
	amount?: number;
}
export type counterActionType =
	| typeof INCREMENT
	| typeof DECREMENT
	| typeof INCREASE
	| typeof TOGGLE_COUNTER;

const initialState: CounterState = {
	counter: 0,
	showCounter: true,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});
// const counterReducer = (
// 	state: CounterState = initialState,
// 	action: CounterAction
// ) => {
// 	if (action.type === INCREMENT) {
// 		return {
// 			counter: state.counter + 1,
// 			showCounter: state.showCounter,
// 		};
// 	}
// 	if (action.type === INCREASE) {
// 		return {
// 			counter: state.counter + (action.amount || 0),
// 			showCounter: state.showCounter,
// 		};
// 	}
// 	if (action.type === DECREMENT) {
// 		return {
// 			counter: state.counter - 1,
// 			showCounter: state.showCounter,
// 		};
// 	}
// 	if (action.type === TOGGLE_COUNTER) {
// 		return {
// 			counter: state.counter,
// 			showCounter: !state.showCounter,
// 		};
// 	}
// 	return state;
// };

// const store = createStore(counterReducer);

// export default store;

export const counterActions = counterSlice.actions;
export default counterSlice;
