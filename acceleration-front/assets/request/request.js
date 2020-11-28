import products from './offers.json'

/** True = 65%, False = 35% */
const rejectByChance = () => {
  return false
}

/** Emulate get request */
export const getProducts = () =>
  new Promise((resolve, reject) => {
    if (rejectByChance()) {
      return reject({
        error: 'Server error',
      })
    }
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
      resolve(products)
    }, delay)
  })

/** Emulate delete request */
export const deleteProducts = () =>
  new Promise((resolve, reject) => {
    if (rejectByChance()) {
      return reject({
        error: 'Server error',
      })
    }
    const delay = parseInt(Math.random() * 1000)
    setTimeout(() => {
      resolve({ message: 'deleted' })
    }, delay)
  })
