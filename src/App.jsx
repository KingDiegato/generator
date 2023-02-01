import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { hotelReview } from './services/ai'
import './styles/main.css'

function App() {
  const [able, setAble] = useState(true)
  let prom = null
  const handleClick = async () => {
    const text = document.getElementById('field').value
    const option = document.getElementById('option').value
    console.log(+option)
    // const size = document.getElementById('option').value
    setAble(false)
    prom = hotelReview(text, +option)
    const value = await prom

    document.getElementById('res').value = value
    prom = null
    setAble(true)
  }
  return (
    <div className='App'>
      <h1> Info Generator with AI </h1>
      <span>Powered by Co:Here</span>
      <TextField id='option' type='number' label='Insert a size' defaultValue='100' helperText='range: 100 - 2000' />
      {
        able ? <TextField id='field' label='Input a question' /> : <TextField disabled id='field' label='Input a question' />
      }
      <TextField id='res' multiline maxRows={20} disabled defaultValue='waiting for the prompt' />
      {
        able ? <Button variant='contained' color='success' onClick={handleClick}> Start Generate </Button> : <Button variant='contained' color='secondary' disabled> Waiting for the promise </Button>
      }

    </div>
  )
}

export default App
