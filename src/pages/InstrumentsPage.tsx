import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
      const temp =  finalArray.map(obj=>({symbol:obj[0],name:obj[1],sector:obj[2],validTill:obj[3]})).filter(obj=>obj.name!=='Name')
      setData(temp.sort((a,b)=>{
        if(a.symbol>b.symbol) return 1;
        else if(a.symbol<b.symbol) return -1;
        return 0
      }))
    })
  },[])
  
  const RowClick = (id:string)=> navigate(`/quotes/${id}`)


  return (
    <div className='w-[90%] flex flex-col justify-center'>
      <input className='' placeholder='search' onChange={(e)=>setSearchTerm(e.target.value)}/>
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
                <tr  key={i.symbol} onClick={()=>RowClick(i.symbol)} className='hover:bg-slate-100 text-sm'>
                  <th scope="row" >{i.symbol}</th>
                  <td>{i.name}</td>
                  <td>{i.sector}</td>
                  <td>{i.validTill}</td>
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