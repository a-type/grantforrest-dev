export function isLight(color: string) {
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;

  if (color.match(/^rgb/)) {
    const parsed = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = parseInt(parsed[1]);
    g = parseInt(parsed[2]);
    b = parseInt(parsed[3]);
  } else {
    const formatted = '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&');
    const parsed = +formatted;
    r = parsed >> 16;
    g = (parsed >> 8) & 255;
    b = parsed & 255;
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp > 127.5;
}
