/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-yellow": "#f0b322",
				"primary-yellow-hover": "#f0920e",
				"text-gray": "#6b7280",
				"text-dark": "#1f2937",
				"input-background": "#d1d5db",
				"input-text": "#374151",
				"invalid-label": "#f87171",
				"invalid-input-text": "#ef4444",
				"invalid-input-border": "#f73f3f",
				"invalid-input-background": "#fed2d2",
				"auth-background-start": "#474232",
				"auth-background-end": "#28271c",
				"body-background": "#ffaa00",
			},
			fontFamily: {
				title: ['"Pacifico"', "cursive"],
			},
			backgroundImage: {},
		},
	},
	plugins: [],
};
