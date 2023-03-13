import {
  findAllByRole,
  findByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

describe('App distance calculator', () => {
  it('can render app', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const form = await screen.findByRole('form')
    expect(form).toBeDefined()
  })

  it('Button disabled at first rendering', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const button = await screen.findByText('Submit')
    expect(button).toBeDisabled()
  })

  it('Button disabled at first rendering', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const button = await screen.findByText('Submit')
    expect(button).toBeDisabled()
  })

  it('Button enabled when fields are populated', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const inputs = await screen.findAllByTestId('selector')
    await userEvent.type(inputs[0], 'paris')
    const paris = await screen.findByText('Paris')
    await userEvent.click(paris)

    await userEvent.type(inputs[1], 'marseille')
    const marseille = await screen.findByText('Marseille')
    await userEvent.click(marseille)

    await userEvent.type(inputs[2], 'lyon')
    const lyon = await screen.findByText('Lyon')
    await userEvent.click(lyon)

    const button = await screen.findByText('Submit')
    expect(button).toBeEnabled()
  })
})
