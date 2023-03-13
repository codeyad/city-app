import { useNavigate } from 'react-router-dom'
import { SelectorItem } from '../../interfaces'
import FormComponent from '../formComponent'
import './home.css'

interface FormValues {
  originCity: SelectorItem[]
  intermediateCity: SelectorItem[]
  destinyCity: SelectorItem[]
  date: null | string
  passengers: number
}

function HomeComponentPage() {
  const navigate = useNavigate()
  return (
    <FormComponent
      onSubmit={(data: FormValues) => {
        console.log(data)
        navigate('result', { state: data })
      }}
    />
  )
}

export default HomeComponentPage
