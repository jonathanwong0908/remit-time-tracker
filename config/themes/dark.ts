/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  name: "dark",
  extend: {
    backgroundColor: {
      primary: colors.white,
      surface: {
        container: {
          low: colors.black,
          DEFAULT: colors.slate[950],
          high: colors.slate[900],
          higher: colors.slate[800],
          highest: colors.neutral[50],
        },
      },
    },
    textColor: {
      display: {
        DEFAULT: colors.neutral[50],
        inverted: colors.neutral[950],
      },
      headline: colors.neutral[50],
      title: colors.neutral[50],
      body: colors.neutral[50],
      label: colors.neutral[50],
      nav: colors.neutral[400],
      muted: colors.neutral[500],
    },
    borderColor: {
      DEFAULT: colors.slate[800],
      inverted: colors.slate[300],
    },
  },
};
