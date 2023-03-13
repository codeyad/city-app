import './selectorComponent.css'
import UseSelector from './useSelector'
import loading from './../../assets/loading.svg'
import { SelectorComponentProps } from '../../interfaces'

const SelectorComponent = ({
  list,
  label,
  name,
  multi,
  isRequired,
  isLoading,
  onType,
  onError,
  onSelectedValue,
  initialSelectedItems,
}: SelectorComponentProps) => {
  const {
    handleInputChange,
    handleClick,
    handleOnBlur,
    divRef,
    text,
    inputRef,
    selectedItems,
    deleteSelectedElement,
    isOpen,
    onFocus,
    errorMessage,
  } = UseSelector({
    list,
    multi,
    isRequired,
    onType,
    isLoading,
    onError,
    onSelectedValue,
    initialSelectedItems,
  })
  return (
    <div
      id='selector-component'
      tabIndex={0}
      onBlur={handleOnBlur}
      ref={divRef}
    >
      <label htmlFor={name}>{label}</label>
      <div id='input-div'>
        {selectedItems.length ? (
          <ul className='selections'>
            {selectedItems.map(({ name, id }) => (
              <li key={id}>
                {name}{' '}
                <button onClick={() => deleteSelectedElement(id)}>x</button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          onFocus={onFocus}
          name={name}
          id={name}
          value={text}
          type='search'
          onChange={handleInputChange}
          ref={inputRef}
          data-testid='selector'
        />
      </div>
      {errorMessage && <span className='input-error'>{errorMessage}</span>}
      {isLoading ? (
        <img
          data-testid='loader'
          className='loading'
          src={loading}
          alt='My Happy SVG'
        />
      ) : null}
      <ul className='menu'>
        {isOpen
          ? list.map(item => (
              <li
                onClick={() => {
                  handleClick(item)
                }}
                key={item.id}
              >
                {item.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default SelectorComponent
