export const displayNumber = (n, decimal = true, cash = false) => {
  const value = decimal ? parseFloat(n).toLocaleString(undefined, { maximumFractionDigits: 2 }) : parseInt(n).toLocaleString()
  return `${cash ? '$' : ''}${value}`
}
