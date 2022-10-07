

export const toTimeDiff = (dateString1:string,dateString2:string) =>{
    const date1 = new Date(dateString1)
    const date2 = new Date(dateString2)
    return (date2.getTime() - date1.getTime())/10
}


