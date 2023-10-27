/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

export const fakeData = (format, timesRandom = 10) => {
  const formatKeys = Object.keys(format)
  const dataToReturn = []

  const amount = Math.floor(Math.random() * timesRandom)

  for (let i = 0; i < amount; i++) {
    const dictToAppend = {}
    formatKeys.forEach(key => {
      dictToAppend[key] = generateRandomString(format[key] || 10)
    })
    dataToReturn.push(dictToAppend)
  }

  return dataToReturn
}

export const fakeApiCall = {
  sectores: async (error = false, timeout = 2000, actualData, amount = 2) => {
    await new Promise(resolve => setTimeout(resolve, timeout))

    if (error) throw new Error(generateRandomString(10))

    const data = [...actualData]
    const toAppend = Math.floor(Math.random() * amount)

    for (let i = 0; i < toAppend; i++) {
      const string = generateRandomString(10)
      data.push(string)
    }

    return data
  }
}
