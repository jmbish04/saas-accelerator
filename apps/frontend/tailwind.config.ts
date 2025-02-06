import { type Config } from "@repo/config";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.@(ts|tsx)", "../../packages/ui/src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config; 