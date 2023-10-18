export const renderRunwayText = (surface) => {
  switch (surface) {
    case 'A':
      return 'Asphalt'
    case 'B':
      return 'Bituminous'
    case 'C':
      return 'Concrete'
    case 'CE':
      return 'Cement'
    case 'CR':
      return 'Water'
    case 'G':
      return 'Grass'
    case 'GR':
      return 'Gravel'
    case 'M':
      return 'Macadam'
    case 'S':
      return 'Sand'
    case 'T':
      return 'Tarmac'
    case 'W':
      return 'Water'
    default:
      return 'Unknown'
  }
}
