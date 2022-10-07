import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InstrumentsPage = () => {
  const [data,setData] = useState<Array<Array<string>>>()
  const navigate = useNavigate()
  
  useEffect(()=>{
    axios.get('https://prototype.sbulltech.com/api/v2/instruments').then(res=>{
      const arr:string[] = res.data.split("\n")
      const finalArray = arr.map(obj=>obj.split(','))
      setData(finalArray)
    })
  },[])
  
  const RowClick = (id:string)=>{
    navigate(`/quotes/${id}`)
  }

  return (
    
    <div className='w-[90%] flex justify-center'>

      <table className="table border shadow-lg">
        <thead >
          <tr className=' shadow-md'>
            <th scope="col" className=' font-semibold text-sm'>Symbol</th>
            <th scope="col" className=' font-semibold text-sm'>Name</th>
            <th scope="col" className=' font-semibold text-sm'>Sector</th>
            <th scope="col" className=' font-semibold text-sm'>Validtill</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.slice(1)?.map(i=>{
              
              return(
                <tr  key={i[0]} onClick={()=>RowClick(i[0])} className='hover:bg-slate-100 text-sm'>
                  <th scope="row" >{i[0]}</th>
                  <td>{i[1]}</td>
                  <td>{i[2]}</td>
                  <td>{i[3]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>

  )
}

export default InstrumentsPage