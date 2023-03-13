import { useEffect, useState } from 'react'
import { DatePickerProps } from '../../interfaces'

function DatePickerComponent({
  label,
  onSelectedValue,
  initialValue,
}: DatePickerProps) {
  const tomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  const [val, setVal] = useState<string>(tomorrowDate().toJSON().split('T')[0])
  useEffect(() => {
    if (initialValue) {
      setVal(initialValue)
      onSelectedValue(initialValue)
    } else {
      onSelectedValue(val)
    }
  }, [])

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
    onSelectedValue(e.target.value)
  }

  return (
    <>
      <label htmlFor='date'>{label}</label>
      <input
        id='date'
        type='date'
        name=''
        value={val}
        onChange={handler}
        min={tomorrowDate().toISOString().slice(0, 10)}
      />
    </>
  )
}

export default DatePickerComponent
