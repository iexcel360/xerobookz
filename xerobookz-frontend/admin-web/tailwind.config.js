/** @type {import('tailwindcss').Config} */
const sharedConfig = require("../ui-shared/tailwind.config");

module.exports = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui-shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // Portal-specific overrides if needed
    },
  },
  plugins: [...sharedConfig.plugins],
};
