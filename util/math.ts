export function quantize(num: number, quant: number, roundDown = false) {
  if (roundDown) {
    return Math.floor(num / quant) * quant;
  }
  return Math.round(num / quant) * quant;
}
