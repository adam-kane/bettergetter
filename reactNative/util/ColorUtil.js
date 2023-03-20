export function randomRGB() {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},`;
}
