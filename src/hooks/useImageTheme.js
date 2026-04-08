import { useEffect, useState } from "react";
import { getPalette } from "colorthief";

//  brightness
const getBrightness = (r, g, b) => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// auto text color
const getTextColor = (r, g, b) => {
  return getBrightness(r, g, b) > 150 ? "#111827" : "#ffffff";
};

export const useImageTheme = (imageUrl) => {
  const [theme, setTheme] = useState({
    primary: "#111827",
    secondary: "#1f2937",
    accent: "#3b82f6",
    text: "#ffffff",
  });

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = async () => {
      try {
        const palette = await getPalette(img, 3);

        const [p, s, a] = palette;

        const primary = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
        const secondary = `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        const accent = `rgb(${a[0]}, ${a[1]}, ${a[2]})`;

        const text = getTextColor(p[0], p[1], p[2]);

        setTheme({
          primary,
          secondary,
          accent,
          text,
        });
      } catch (err) {
        console.error("Color extraction failed:", err);
      }
    };

    img.onerror = () => {
      console.error("Image failed to load (CORS issue most likely)");
    };
  }, [imageUrl]);

  return theme;
};