import CITIES from './data'
import haversine from 'haversine-distance'
import { Cities, Coordinates } from '../interfaces'

interface SearchFn {
  (subString: string): Promise<Cities>
}

const getCities = async (
  city: string
): Promise<Cities[] | { error: string }> => {
  const promise = new Promise<Cities[]>((resolve, reject) =>
    setTimeout(() => {
      if (city.toLocaleLowerCase() === 'fail')
        reject({ error: 'error has ocurred' })
      resolve(
        CITIES.filter(({ name }) => name.toLocaleLowerCase().includes(city))
      )
    }, 1000)
  )

  try {
    const result = await promise
    result.length = 5 //limit result
    return result
  } catch (error: any) {
    return error
  }
}

const calculateDistance = async (
  cities: Coordinates[]
): Promise<number | unknown> => {
  const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const resultInMeters = cities.reduce((prv, cur, index, arr): number => {
        if (arr.length - 1 === index) return prv

        prv = prv + haversine(arr[index], arr[index + 1])
        return prv
      }, 0)
      resolve(resultInMeters / 1000)
    }, 1000)
  })

  try {
    const result = await promise
    return result
  } catch (error) {
    return error
  }
}

export { getCities, calculateDistance }
