import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	isAuthenticated: boolean;
}

const auth_initialState: AuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "authentication",
	initialState: auth_initialState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});
export default authSlice;
export const authActions = authSlice.actions;
