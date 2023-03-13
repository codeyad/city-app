interface LatitudeLongitude {
  latitude: number
  longitude: number
}

interface LatLng {
  lat: number
  lng: number
}

interface LatLon {
  lat: number
  lon: number
}

interface GeoJSONPoint extends Array<number | number> {
  0: number
  1: number
}

export type Coordinates = GeoJSONPoint

export interface SelectorComponentProps {
  list: SelectorItem[]
  label?: string
  name?: string
  multi?: boolean
  isRequired?: boolean
  onType?: (data: string) => void
  onError?: (hasError: boolean) => void
  onSelectedValue?: (data: SelectorItem[]) => void
  isLoading?: boolean
  initialSelectedItems?: SelectorItem[]
}

export interface SelectorItem {
  name: string
  id: number
  location: Coordinates
}

export interface Cities {
  name: string
  location: Coordinates
}

export interface FormValues {
  originCity: SelectorItem[]
  intermediateCity: SelectorItem[]
  destinyCity: SelectorItem[]
  date: null | string
  passengers: number
}

export interface DatePickerProps {
  label?: string
  onSelectedValue: (data: string) => void
  initialValue?: string | null
}
