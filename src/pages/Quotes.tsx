import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface stockDataType{
  price:number,
  time:string,
  valid_till:string
}

const Quotes = () => {
  const {symbol} = useParams()
  const [stockData,setStockData] = useState<stockDataType[]>()
  const navigate = useNavigate()

  useEffect(()=>{
    if(symbol!==undefined){
        axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`).then(res=>{
          if(res.data.success===false){
            navigate('/')
          }else{
            setStockData(res.data.payload[symbol])
          }
        })
    }
  },[symbol,navigate])


  return (
  <div className='w-[90%] flex justify-center'>

    <table className="table border shadow-lg">
      <thead >
        <tr className=' shadow-md'>
          <th scope="col" className=' font-semibold text-sm'>price</th>
          <th scope="col" className=' font-semibold text-sm'>time</th>
          <th scope="col" className=' font-semibold text-sm'>Validtill</th>
        </tr>
      </thead>
      <tbody>
        {
          stockData?.slice(1)?.map(i=>{
            
            return(
              <tr  key={i.time} className='hover:bg-slate-100 text-sm'>
                <td>{i.price.toFixed(3)}</td>
                <td>{i.time}</td>
                <td>{i.valid_till}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  </div>
  )
}

export default Quotes