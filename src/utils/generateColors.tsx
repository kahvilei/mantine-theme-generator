import chroma from 'chroma-js';

const LIGHTNESS_MAP = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];
const SATURATION_MAP = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

const generateShades = (baseColor: string): string[] => {
  const userColorChroma = chroma.valid(baseColor) ? chroma(baseColor) : chroma('#000000');

  const baseLightness = userColorChroma.get('hsl.l');
  const baseSaturation = userColorChroma.get('hsl.s');

  // Adjust lightness map so that baseColor is at position [5]
  const adjustedLightnessMap = LIGHTNESS_MAP.map((l, i) => {
    const delta = (9 - i - 5) * 0.1;
    return Math.min(Math.max(baseLightness + delta, 0), 1);
  });

  // Adjust saturation map so that baseColor is at position [5]
  const adjustedSaturationMap = SATURATION_MAP.map((s, i) => {
    const delta = (9 - i - 5) * 0.04;
    return Math.min(Math.max(baseSaturation + delta, 0), 1);
  });

  const colors = adjustedLightnessMap.map((l, i) => {
    let color = userColorChroma.set('hsl.l', l);
    const saturationDelta = adjustedSaturationMap[i] - baseSaturation;
    color = saturationDelta >= 0 ? color.saturate(saturationDelta) : color.desaturate(-saturationDelta);
    return color.hex();
  });

  return colors;
};

export default generateShades;