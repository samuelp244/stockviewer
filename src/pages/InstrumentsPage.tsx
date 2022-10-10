import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {IoSearchSharp} from 'react-icons/io5'

interface dataType{
  name:string ,
  sector:string,
  symbol:string,
  validTill:string,
}

const InstrumentsPage = () => {

  const [data,setData] = useState<Array<dataType>>()
  const [searchTerm,setSearchTerm] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('https://prototype.sbulltech.com/api/v2/instruments').then(res=>{
      const arr:string[] = res.data.split("\n")
      const finalArray = arr.map(obj=>obj.split(','))
      const temp =  finalArray.map(obj=>({symbol:obj[0],name:obj[1],sector:obj[2],validTill:obj[3]})).filter(obj=>obj.name!=='Name'&&obj.symbol!=="")
      setData(temp.sort((a,b)=>{
        if(a.symbol>b.symbol) return 1;
        else if(a.symbol<b.symbol) return -1;
        return 0
      }))
    })
  },[])
  
  const RowClick = (id:string)=>{
    navigate(`/quotes/${id}`)
    // console.log(id)
  }

  return (
    <div className='w-[90%] flex flex-col gap-3 justify-center shadow rounded p-2 pt-3 bg-white'>
        <div className='flex justify-end'>
          <div className='flex border border-black w-72 rounded'>
            <input className=' w-full p-1 px-2 rounded focus:outline-none' placeholder='search' onChange={(e)=>setSearchTerm(e.target.value)}/>
            <span className='my-auto px-3'><IoSearchSharp/></span>
          </div>
        </div>
        
        <div className='rounded  '>
          <table className="table shadow-md mb-0 ">
            <thead className=''>
              <tr className=''>
                <th scope="col" className=' text-xs py-auto font-medium text-gray-500 w-1/4'>Symbol</th>
                <th scope="col" className=' text-xs py-auto font-medium text-gray-500 w-1/4'>Name</th>
                <th scope="col" className=' text-xs py-auto font-medium text-gray-500 w-1/4'>Sector</th>
                <th scope="col" className=' text-xs py-auto font-medium text-gray-500 w-1/4'>Validtill</th>
              </tr>
            </thead>
          </table>
          <div className='overflow-auto h-[20.5rem]'>
            <table className='table'>
              <tbody >
                {
                  data?.filter(val=>{
                    if(searchTerm===""){
                      return val
                    }else if (val.symbol?.toLowerCase().includes(searchTerm.toLowerCase())||
                              val.name?.toLowerCase().includes(searchTerm.toLowerCase())||
                              val.sector?.toLowerCase().includes(searchTerm.toLowerCase())||
                              val.validTill?.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val
                    }
                    return null
                  }).map(i=>{
                    return(
                      <tr key={i.symbol} onClick={()=>RowClick(i.symbol)} className='hover:bg-gray-100'>
                        <th scope="row" className='w-1/4 text-sm'>{i.symbol}</th>
                        <td className='w-1/4 text-sm'>{i.name}</td>
                        <td className='w-1/4 text-sm'>{i.sector}</td>
                        <td className='w-1/4 text-sm'>{i.validTill}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default InstrumentsPage