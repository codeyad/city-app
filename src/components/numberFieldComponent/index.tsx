import { useState, useEffect } from 'react'
interface NumberFieldComponentProps {
  label: string
  onSelectedValue: (data: number) => void
  initialValue?: number
}

function NumberFieldComponent({
  label,
  onSelectedValue,
  initialValue,
}: NumberFieldComponentProps) {
  const [value, setValue] = useState<number>(1)

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value < 1 ? 1 : +e.target.value
    onSelectedValue(val)
    setValue(val)
  }

  useEffect(() => {
    if (initialValue) setValue(initialValue)
  }, [])

  return (
    <>
      <label htmlFor='passengers'>{label}</label>
      <input id='passengers' type='number' value={value} onChange={handler} />
    </>
  )
}

export default NumberFieldComponent
