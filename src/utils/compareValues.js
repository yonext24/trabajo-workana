export const compareValues = (dict1, dict2) => {
  const keys = Object.keys(dict1)

  for (let i = 0; i < keys.length; i++) {
    const actualKey = keys[i]
    if (dict1[actualKey] !== dict2[actualKey]) return false
  }

  return true
}
