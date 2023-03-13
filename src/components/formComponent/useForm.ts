import { useEffect, useState } from 'react'
import { FormValues } from '../../interfaces'
import { getCities, calculateDistance } from '../../service/api'
import { SelectorItem } from './../../interfaces'

function UseForm({
  useDeepLink,
  onSubmit,
  initFormValues,
}: {
  useDeepLink?: boolean
  onSubmit?: (data: FormValues) => void
  initFormValues?: FormValues
}) {
  const [list, setList] = useState<SelectorItem[]>([])
  const [list2, setList2] = useState<SelectorItem[]>([])
  const [list3, setList3] = useState<SelectorItem[]>([])

  const [formValues, setFormValues] = useState<FormValues>({
    originCity: [],
    intermediateCity: [],
    destinyCity: [],
    date: null,
    passengers: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [isLoading3, setIsLoading3] = useState(false)
  const [formIsLoading, setFormIsLoading] = useState(true)
  const searchParams: URL = new URL(window.location.href)
  const [distance, setDistance] = useState({
    d1: 0,
    d2: 0,
  })

  const [distanceIsLoading, setdistanceIsLoading] = useState(true)

  useEffect(() => {
    let values
    const params = new URLSearchParams(window.location.search)
    const paramsObjet = params.get('formValues')
    values = paramsObjet ? JSON.parse(paramsObjet) : formValues
    if (initFormValues) {
      values = initFormValues
      searchParams.searchParams.set('formValues', JSON.stringify(values))
      useDeepLink && window.history.pushState({}, '', searchParams)
    }
    setFormValues({ ...values })
    setFormIsLoading(false)
  }, [])

  useEffect(() => {
    setDistance({ d1: 0, d2: 0 })
    searchParams.searchParams.set('formValues', JSON.stringify(formValues))
    useDeepLink && window.history.pushState({}, '', searchParams)
    if (useDeepLink) calculate()
  }, [formValues])

  const onType = (city: string) => {
    setIsLoading(true)
    getCities(city)
      .then(data => {
        if (!Array.isArray(data)) return alert(data.error)

        setList(
          data.map(({ name, location }) => ({
            name: name,
            id: location[0],
            location,
          }))
        )
        setIsLoading(false)
      })
      .catch(error => {
        alert(error)
      })
  }

  const onTypeIntermediate = (city: string) => {
    setIsLoading2(true)
    getCities(city).then(data => {
      if (!Array.isArray(data)) return alert(data.error)
      setList2(
        data.map(({ name, location }) => ({
          name: name,
          id: location[0],
          location,
        }))
      )
      setIsLoading2(false)
    })
  }

  const onTypeDestiny = (city: string) => {
    setIsLoading3(true)
    getCities(city).then(data => {
      if (!Array.isArray(data)) return alert(data.error)
      setList3(
        data.map(({ name, location }) => ({
          name: name,
          id: location[0],
          location,
        }))
      )
      setIsLoading3(false)
    })
  }

  const hasError = () => {
    const { originCity: c1, intermediateCity: c2, destinyCity: c3 } = formValues
    if (!c1.length || !c2.length || !c3.length) return true

    return false
  }

  const calculate = () => {
    if (!formValues.originCity.length) return

    const intermediateLocations = formValues.intermediateCity.map(
      ({ location }) => location
    )
    const allCities = [
      ...formValues.originCity,
      ...formValues.intermediateCity,
      ...formValues.destinyCity,
    ]
    const hasDijon = allCities.find(
      city => city.name.toLocaleLowerCase() === 'dijon'
    )
    setdistanceIsLoading(true)
    try {
      if (hasDijon) throw 'Error has ocurred'
      const d1 = calculateDistance([
        formValues.originCity[0].location,
        ...intermediateLocations,
      ]) as Promise<number>

      const d2 = calculateDistance([
        ...intermediateLocations,
        formValues.destinyCity[0].location,
      ]) as Promise<number>

      Promise.allSettled([d1, d2])
        .then(([r1, r2]) => {
          let d1 = 0
          let d2 = 0
          if (r1.status === 'fulfilled') d1 = Math.floor(r1.value)
          if (r2.status === 'fulfilled') d2 = Math.floor(r2.value)

          setDistance({ d1, d2 })
        })
        .catch(error => {
          alert(error)
        })
        .finally(() => {
          setdistanceIsLoading(false)
        })
    } catch (error) {
      alert(error)
      setdistanceIsLoading(false)
    }
  }

  return {
    onTypeDestiny,
    onTypeIntermediate,
    onType,
    hasError,
    isLoading,
    isLoading2,
    isLoading3,
    formIsLoading,
    list,
    list2,
    list3,
    setFormValues,
    formValues,
    distance,
    distanceIsLoading,
  }
}

export default UseForm
