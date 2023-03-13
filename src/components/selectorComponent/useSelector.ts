import { SelectorComponentProps, SelectorItem } from '@App/interfaces'
import { useEffect, useRef, useState } from 'react'

function UseSelector({
  list,
  multi,
  isRequired,
  onType,
  isLoading,
  onError,
  onSelectedValue,
  initialSelectedItems,
}: SelectorComponentProps) {
  const [text, setText] = useState<string>('')
  const [selectedItems, setSelecteditems] = useState<SelectorItem[]>([])
  // const [filteredList, setFilteredList] = useState<SelectorItem[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const errorMessageText = `This field is required!`
  const [isDirty, setIsDirty] = useState<boolean>(false)

  useEffect(() => {
    console.log(initialSelectedItems)
    if (initialSelectedItems) setSelecteditems(initialSelectedItems)
  }, [])

  useEffect(() => {
    isDirty && onValidate()
  }, [selectedItems, isOpen, isDirty])

  useEffect(() => {
    onSelectedValue && onSelectedValue(selectedItems)
  }, [selectedItems])

  useEffect(() => {
    if (!onError) return
    errorMessage ? onError(true) : onError(false)
  }, [errorMessage])

  useEffect(() => {
    if (!isLoading && list.length) setIsOpen(true)
  }, [list, isLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (onType) return onType(e.target.value)

    // const filtered = filterData(e.target.value)
    // if (filtered.length) setIsOpen(true)
    // setFilteredList(filtered)
  }

  const handleClick = (value: SelectorItem) => {
    if (!multi) {
      setSelecteditems([value])
      // setFilteredList(filterData(value.text))
    } else {
      const items = new Set([...selectedItems, value])
      const itemsArray = Array.from(items.values())
      setSelecteditems(itemsArray)
    }
    setText('')

    setIsOpen(false)
  }

  // const filterData = (data: string) =>
  //   data.length ? list.filter(item => item.text.includes(data)) : []

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    setTimeout(() => {
      if (
        document.activeElement !== divRef.current &&
        document.activeElement !== inputRef.current
      ) {
        setIsOpen(false)
        !isDirty && setIsDirty(true)
      }
    }, 0)
  }

  const onFocus = () => text && setIsOpen(true)

  const deleteSelectedElement = (id: number) =>
    setSelecteditems(selectedItems.filter(item => item.id !== id))

  const onValidate = () => {
    if (!isRequired) return
    if (selectedItems.length && errorMessage) setErrorMessage(null)
    if (!selectedItems.length && !errorMessage)
      setErrorMessage(errorMessageText)
  }

  return {
    onFocus,
    isOpen,
    text,
    divRef,
    inputRef,
    handleInputChange,
    handleClick,
    handleOnBlur,
    deleteSelectedElement,
    selectedItems,
    // filteredList,
    errorMessage,
  }
}

export default UseSelector
