import { useLocation } from 'react-router-dom'
import FormComponent from '../formComponent'

function ResultComponentPage() {
  const { state } = useLocation()
  return <FormComponent useDeepLink={true} initFormValues={state} />
}

export default ResultComponentPage
