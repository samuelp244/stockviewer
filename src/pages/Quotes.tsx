import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TbSortAscending,TbSortDescending} from 'react-icons/tb'
import { toTimeDiff } from '../utils/toTimeDiff'
interface stockDataType{
  price:number,
  time:string,
  valid_till:string
}

const Quotes = () => {
  const {symbol} = useParams()
  const [stockData,setStockData] = useState<stockDataType[]>()
  const [order,setOrder] = useState("ASC")
  const [refreshTime,setRefreshTime] = useState<number>(1000000)

  const navigate = useNavigate()

  useEffect(()=>{
    if(symbol!==undefined){
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/quotes/${symbol}`).then(res=>{
          if(res.data.success===false){
            navigate('/')
          }else{
            setStockData(res.data.payload[symbol])
            const temp:stockDataType[] = res.data.payload[symbol]
            const sortedtemp = temp?.sort((a,b)=>{
              return a.time < b.time ? 1 : -1
            })
            // console.log(sortedtemp[0])
            const tempRefreshTime = toTimeDiff(sortedtemp[0].time,sortedtemp[0].valid_till)
            if(tempRefreshTime!==undefined) setRefreshTime(tempRefreshTime)
            
          }
        })
    }
    
  },[symbol,navigate])

  setTimeout(()=>{
    window.location.reload()
  },refreshTime)

  const Sorting = () =>{
    if (order==="ASC"){
      const sorted = stockData?.sort((a,b)=>{
        return a.time > b.time ? 1 : -1
      })
      setStockData(sorted)
      setOrder("DSC")
    }
    if(order==="DSC"){
      const sorted = stockData?.sort((a,b)=>{
        return a.time < b.time ? 1 : -1
      })
      setStockData(sorted)
      setOrder("ASC")
    }
  }

  return (
  <div className='w-[90%] flex flex-col justify-center shadow rounded p-2 bg-white'>
    <div className='flex justify-start p-2'><p>{symbol}</p></div>
    <table className="table mb-0">
      <thead>
        <tr className=' shadow-md'>
          <th scope="col" className=' font-medium text-xs text-gray-500 hover:bg-slate-100'>Price</th>
          <th scope="col" className=' font-medium text-xs text-gray-500 flex justify-between hover:bg-slate-100' onClick={()=>Sorting()}>
            <span>Time</span>
            <span className='my-auto'>{order==="ASC"?<TbSortAscending/>:<TbSortDescending/>}</span>
          </th>
          <th scope="col" className=' font-medium text-xs text-gray-500 hover:bg-gray-100'>Validtill</th>
        </tr>
      </thead>
      <tbody >
        {
          stockData?.map(i=>{
            return(
              <tr  key={i.price} className='hover:bg-gray-100 text-sm'>
                <td className='w-1/3 text-sm'>{i.price.toFixed(3)}</td>
                <td className='w-1/3 text-sm'>{i.time}</td>
                <td className='w-1/4 text-sm'>{i.valid_till}</td>
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