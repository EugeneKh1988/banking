import { pixelBasedPreset, type TailwindConfig } from "react-email";

export default {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        "green-60": "#CAFF33",
        "orange-65": "#FF8D4D",
        "grey-30": "#4C4C4D",
        "grey-10": "#1A1A1A",
        "grey-11": "#1C1C1C",
        "grey-15": "#262626",
      },
    },
  },
} satisfies TailwindConfig