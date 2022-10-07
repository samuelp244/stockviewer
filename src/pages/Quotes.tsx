import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Quotes = () => {
  const {symbol} = useParams()
  useEffect(()=>{
    axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`).then(res=>{
      console.log(res.data)
    })
  },[symbol])
  return (
    <div>
      <p>{symbol}</p>
    </div>
  )
}

export default Quotes