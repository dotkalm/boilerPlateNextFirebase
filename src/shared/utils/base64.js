export const base64 = string => {
  return Buffer.from(string, 'utf8').toString('base64')
}
export const unbase64 = string => {
  return Buffer.from(string, 'base64').toString('utf8')
}

