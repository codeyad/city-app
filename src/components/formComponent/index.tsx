import { FormValues } from '../../interfaces'
import DatePickerComponent from '../datePickerComponent'
import NumberFieldComponent from '../numberFieldComponent'
import SelectorComponent from '../selectorComponent'
import UseForm from './useForm'
import loading from '../../assets/loading.svg'
import './form.css'

interface FormProps {
  useDeepLink?: boolean
  onSubmit?: (data: FormValues) => void
  initFormValues?: FormValues
}

function FormComponent({ useDeepLink, onSubmit, initFormValues }: FormProps) {
  const {
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
  } = UseForm({ useDeepLink, initFormValues })
  const handler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onSubmit && onSubmit(formValues)
  }
  const distance1 = () =>
    distance.d1 ? (
      <p className='distance'>
        Distance between origin city and intemediate cities is {distance.d1}KM
      </p>
    ) : null

  const distance2 = () =>
    distance.d1 ? (
      <p className='distance'>
        Distance between intemediate cities and destiny city is {distance.d2}KM
      </p>
    ) : null

  return (
    <>
      {!formIsLoading ? (
        <form aria-label='form'>
          <SelectorComponent
            label='City of origin'
            name='City of origin'
            list={list}
            isRequired={true}
            multi={false}
            onType={onType}
            isLoading={isLoading}
            onSelectedValue={data =>
              setFormValues({ ...formValues, originCity: data })
            }
            initialSelectedItems={formValues.originCity}
          />
          {distanceIsLoading ? (
            <img className='loading' src={loading} alt='My Happy SVG' />
          ) : (
            distance1()
          )}

          <SelectorComponent
            label='Intermediate cities'
            name='Intermediate cities'
            list={list2}
            isRequired={true}
            multi={true}
            onType={onTypeIntermediate}
            isLoading={isLoading2}
            onSelectedValue={data =>
              setFormValues({ ...formValues, intermediateCity: data })
            }
            initialSelectedItems={formValues.intermediateCity}
          />
          {distanceIsLoading ? (
            <img className='loading' src={loading} alt='My Happy SVG' />
          ) : (
            distance2()
          )}

          <SelectorComponent
            label='City of destination'
            name='City of destination'
            list={list3}
            isRequired={true}
            multi={false}
            onType={onTypeDestiny}
            isLoading={isLoading3}
            onSelectedValue={data =>
              setFormValues({ ...formValues, destinyCity: data })
            }
            initialSelectedItems={formValues.destinyCity}
          />
          <DatePickerComponent
            onSelectedValue={data =>
              setFormValues({ ...formValues, date: data })
            }
            label='date of trip'
            initialValue={formValues.date}
          />
          <NumberFieldComponent
            onSelectedValue={data =>
              setFormValues({ ...formValues, passengers: data })
            }
            label='number of passengers'
            initialValue={formValues.passengers}
          />
          <button type='button' onClick={handler} disabled={hasError()}>
            Submit
          </button>
        </form>
      ) : null}
    </>
  )
}

export default FormComponent
