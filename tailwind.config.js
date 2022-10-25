/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
			fontFamily: {
				pop: ["Poppins"],
			},
		},
	},
	plugins: [require("daisyui")],
};
