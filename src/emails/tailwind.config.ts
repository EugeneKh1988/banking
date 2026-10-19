import { pixelBasedPreset, type TailwindConfig } from "react-email";

export default {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        "orange-97": "#FFF5F0",
        "orange-65": "#FF8D4D",
        "grey-30": "#4C4C4D",
        "grey-10": "#1A1A1A",
        "grey-15": "#262626",
      },
    },
  },
} satisfies TailwindConfig